import argparse

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--name', default='world')
    args = p.parse_args()
    print(f'Hello, {args.name}!')

if __name__ == '__main__':
    main()
