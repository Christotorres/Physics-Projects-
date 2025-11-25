import math

def kinematics_menu():
    print("\n--- Kinematics ---")
    print("1. Find final velocity (v = u + a t)")
    print("2. Find displacement (s = u t + 0.5 a t^2)")
    choice = input("Choose (1-2): ")

    try:
        u = float(input("Initial velocity u (m/s): "))
        a = float(input("Acceleration a (m/s^2): "))
        t = float(input("Time t (s): "))
    except ValueError:
        print("Invalid number. Try again.")
        return

    if choice == "1":
        v = u + a * t
        print(f"Final velocity v = {v:.3f} m/s")
    elif choice == "2":
        s = u * t + 0.5 * a * t ** 2
        print(f"Displacement s = {s:.3f} m")
    else:
        print("Invalid choice.")

def forces_menu():
    print("\n--- Forces & Newton's 2nd Law ---")
    try:
        m = float(input("Mass m (kg): "))
        F = float(input("Net force F (N): "))
    except ValueError:
        print("Invalid number. Try again.")
        return

    if m == 0:
        print("Mass cannot be zero.")
        return

    a = F / m
    print(f"Acceleration a = {a:.3f} m/s^2")

def circular_menu():
    print("\n--- Circular Motion ---")
    try:
        m = float(input("Mass m (kg): "))
        v = float(input("Speed v (m/s): "))
        r = float(input("Radius r (m): "))
    except ValueError:
        print("Invalid number. Try again.")
        return

    if r == 0:
        print("Radius cannot be zero.")
        return

    Fc = m * v * v / r
    ac = v * v / r
    print(f"Centripetal force F_c = {Fc:.3f} N")
    print(f"Centripetal acceleration a_c = {ac:.3f} m/s^2")

def main():
    while True:
        print("\n=== Physics Toolkit (Python) ===")
        print("1. Kinematics")
        print("2. Forces (Newton's 2nd Law)")
        print("3. Circular Motion")
        print("4. Quit")
        choice = input("Choose (1-4): ")

        if choice == "1":
            kinematics_menu()
        elif choice == "2":
            forces_menu()
        elif choice == "3":
            circular_menu()
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()
