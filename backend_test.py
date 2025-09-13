#!/usr/bin/env python3
"""
Backend Test Suite for ForgePilot Agent
Tests the FastAPI backend endpoints as specified in the review request.
"""

import requests
import json
import subprocess
import time
import os
import signal
import sys
from typing import Dict, Any, Optional

class ForgePilotTester:
    def __init__(self):
        self.base_url = "http://localhost:8011"
        self.server_process = None
        self.venv_path = "/app/agents/ForgePilot/.venv"
        
    def start_server(self) -> bool:
        """Start the ForgePilot backend server in background"""
        try:
            print("🚀 Starting ForgePilot backend server...")
            
            # Change to the ForgePilot directory
            os.chdir("/app/agents/ForgePilot")
            
            # Start server using the virtual environment
            cmd = [
                f"{self.venv_path}/bin/python", "-m", "uvicorn", 
                "backend.server:app", "--host", "0.0.0.0", "--port", "8010"
            ]
            
            # Start server in background
            self.server_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid
            )
            
            # Wait for server to start
            print("⏳ Waiting for server to start...")
            for i in range(30):  # Wait up to 30 seconds
                try:
                    response = requests.get(f"{self.base_url}/api/health", timeout=2)
                    if response.status_code == 200:
                        print(f"✅ Server started successfully on {self.base_url}")
                        return True
                except requests.exceptions.RequestException:
                    time.sleep(1)
                    continue
            
            print("❌ Server failed to start within 30 seconds")
            return False
            
        except Exception as e:
            print(f"❌ Error starting server: {e}")
            return False
    
    def stop_server(self):
        """Stop the backend server"""
        if self.server_process:
            try:
                print("🛑 Stopping server...")
                # Kill the process group to ensure all child processes are terminated
                os.killpg(os.getpgid(self.server_process.pid), signal.SIGTERM)
                self.server_process.wait(timeout=10)
                print("✅ Server stopped successfully")
            except Exception as e:
                print(f"⚠️ Error stopping server: {e}")
                try:
                    os.killpg(os.getpgid(self.server_process.pid), signal.SIGKILL)
                except:
                    pass
    
    def test_health_endpoint(self) -> Dict[str, Any]:
        """Test GET /api/health endpoint"""
        print("\n🔍 Testing GET /api/health endpoint...")
        
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Body: {json.dumps(data, indent=2)}")
                
                # Verify expected keys
                expected_keys = ["ok", "env", "allow_execute"]
                missing_keys = [key for key in expected_keys if key not in data]
                
                if missing_keys:
                    return {
                        "success": False,
                        "error": f"Missing keys in response: {missing_keys}",
                        "response": data
                    }
                
                if data.get("ok") is not True:
                    return {
                        "success": False,
                        "error": f"Expected ok=true, got ok={data.get('ok')}",
                        "response": data
                    }
                
                print("✅ Health endpoint test PASSED")
                return {
                    "success": True,
                    "response": data,
                    "curl_equivalent": f"curl -X GET {self.base_url}/api/health"
                }
            else:
                return {
                    "success": False,
                    "error": f"Expected status 200, got {response.status_code}",
                    "response": response.text
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Request failed: {str(e)}"
            }
    
    def test_message_endpoint_positive(self) -> Dict[str, Any]:
        """Test POST /api/message with valid input"""
        print("\n🔍 Testing POST /api/message endpoint (positive case)...")
        
        payload = {"input": "Create a Python CLI that prints hello"}
        
        try:
            response = requests.post(
                f"{self.base_url}/api/message",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Request Payload: {json.dumps(payload, indent=2)}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Body: {json.dumps(data, indent=2)}")
                
                # Verify expected keys
                expected_keys = ["session_id", "plan", "scaffold_manifest", "simulations", "summary"]
                missing_keys = [key for key in expected_keys if key not in data]
                
                if missing_keys:
                    return {
                        "success": False,
                        "error": f"Missing keys in response: {missing_keys}",
                        "response": data
                    }
                
                # Verify simulations structure
                simulations = data.get("simulations", {})
                required_sims = ["git_commit", "http_fetch", "code_execute"]
                
                for sim in required_sims:
                    if sim not in simulations:
                        return {
                            "success": False,
                            "error": f"Missing simulation: {sim}",
                            "response": data
                        }
                    
                    sim_data = simulations[sim]
                    if sim_data.get("ok") is not True:
                        return {
                            "success": False,
                            "error": f"Simulation {sim} failed: ok={sim_data.get('ok')}",
                            "response": data
                        }
                
                print("✅ Message endpoint positive test PASSED")
                return {
                    "success": True,
                    "response": data,
                    "session_id": data.get("session_id"),
                    "curl_equivalent": f"curl -X POST {self.base_url}/api/message -H 'Content-Type: application/json' -d '{json.dumps(payload)}'"
                }
            else:
                return {
                    "success": False,
                    "error": f"Expected status 200, got {response.status_code}",
                    "response": response.text
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Request failed: {str(e)}"
            }
    
    def test_message_endpoint_negative(self) -> Dict[str, Any]:
        """Test POST /api/message with invalid input (empty/whitespace)"""
        print("\n🔍 Testing POST /api/message endpoint (negative case)...")
        
        payload = {"input": "   "}  # Whitespace only
        
        try:
            response = requests.post(
                f"{self.base_url}/api/message",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Request Payload: {json.dumps(payload, indent=2)}")
            print(f"Response Body: {response.text}")
            
            if response.status_code == 400:
                print("✅ Message endpoint negative test PASSED")
                return {
                    "success": True,
                    "response": response.text,
                    "curl_equivalent": f"curl -X POST {self.base_url}/api/message -H 'Content-Type: application/json' -d '{json.dumps(payload)}'"
                }
            else:
                return {
                    "success": False,
                    "error": f"Expected status 400, got {response.status_code}",
                    "response": response.text
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Request failed: {str(e)}"
            }
    
    def test_memory_endpoint(self, session_id: str) -> Dict[str, Any]:
        """Test GET /api/memory/{session_id} endpoint"""
        print(f"\n🔍 Testing GET /api/memory/{session_id} endpoint...")
        
        try:
            response = requests.get(
                f"{self.base_url}/api/memory/{session_id}?limit=20",
                timeout=10
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response Body: {json.dumps(data, indent=2)}")
                
                # Verify expected structure
                if "events" not in data:
                    return {
                        "success": False,
                        "error": "Missing 'events' key in response",
                        "response": data
                    }
                
                events = data["events"]
                if not isinstance(events, list):
                    return {
                        "success": False,
                        "error": "Events should be an array",
                        "response": data
                    }
                
                if len(events) < 3:
                    return {
                        "success": False,
                        "error": f"Expected at least 3 events, got {len(events)}",
                        "response": data
                    }
                
                print(f"✅ Memory endpoint test PASSED - Found {len(events)} events")
                return {
                    "success": True,
                    "response": data,
                    "events_count": len(events),
                    "curl_equivalent": f"curl -X GET {self.base_url}/api/memory/{session_id}?limit=20"
                }
            else:
                return {
                    "success": False,
                    "error": f"Expected status 200, got {response.status_code}",
                    "response": response.text
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Request failed: {str(e)}"
            }
    
    def run_all_tests(self) -> Dict[str, Any]:
        """Run all tests and return comprehensive results"""
        print("🧪 Starting ForgePilot Backend Test Suite")
        print("=" * 60)
        
        results = {
            "overall_success": False,
            "tests": {},
            "summary": {}
        }
        
        # Start server
        if not self.start_server():
            results["error"] = "Failed to start server"
            return results
        
        try:
            # Test 1: Health endpoint
            health_result = self.test_health_endpoint()
            results["tests"]["health"] = health_result
            
            # Test 2: Message endpoint (positive)
            message_result = self.test_message_endpoint_positive()
            results["tests"]["message_positive"] = message_result
            
            session_id = None
            if message_result.get("success"):
                session_id = message_result.get("session_id")
            
            # Test 3: Message endpoint (negative)
            negative_result = self.test_message_endpoint_negative()
            results["tests"]["message_negative"] = negative_result
            
            # Test 4: Memory endpoint (if we have a session_id)
            if session_id:
                memory_result = self.test_memory_endpoint(session_id)
                results["tests"]["memory"] = memory_result
            else:
                results["tests"]["memory"] = {
                    "success": False,
                    "error": "No session_id available from message test"
                }
            
            # Calculate overall success
            all_passed = all(test.get("success", False) for test in results["tests"].values())
            results["overall_success"] = all_passed
            
            # Generate summary
            passed_tests = [name for name, test in results["tests"].items() if test.get("success")]
            failed_tests = [name for name, test in results["tests"].items() if not test.get("success")]
            
            results["summary"] = {
                "total_tests": len(results["tests"]),
                "passed": len(passed_tests),
                "failed": len(failed_tests),
                "passed_tests": passed_tests,
                "failed_tests": failed_tests
            }
            
        finally:
            # Always stop the server
            self.stop_server()
        
        return results

def main():
    """Main test execution"""
    tester = ForgePilotTester()
    
    try:
        results = tester.run_all_tests()
        
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        summary = results.get("summary", {})
        print(f"Total Tests: {summary.get('total_tests', 0)}")
        print(f"Passed: {summary.get('passed', 0)}")
        print(f"Failed: {summary.get('failed', 0)}")
        
        if results.get("overall_success"):
            print("\n🎉 ALL TESTS PASSED!")
        else:
            print("\n❌ SOME TESTS FAILED!")
            
            failed_tests = summary.get("failed_tests", [])
            if failed_tests:
                print("\nFailed Tests:")
                for test_name in failed_tests:
                    test_result = results["tests"][test_name]
                    print(f"  - {test_name}: {test_result.get('error', 'Unknown error')}")
        
        print("\n📋 CURL EQUIVALENTS:")
        for test_name, test_result in results["tests"].items():
            if "curl_equivalent" in test_result:
                print(f"  {test_name}: {test_result['curl_equivalent']}")
        
        # Return appropriate exit code
        sys.exit(0 if results.get("overall_success") else 1)
        
    except KeyboardInterrupt:
        print("\n⚠️ Test interrupted by user")
        tester.stop_server()
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        tester.stop_server()
        sys.exit(1)

if __name__ == "__main__":
    main()