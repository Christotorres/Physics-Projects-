#include <iostream>
#include <iomanip>

void kinematicsMenu() {
    std::cout << "\n--- Kinematics ---\n";
    std::cout << "1. Find final velocity (v = u + a t)\n";
    std::cout << "2. Find displacement (s = u t + 0.5 a t^2)\n";
    std::cout << "Choose (1-2): ";

    int choice;
    std::cin >> choice;

    double u, a, t;
    std::cout << "Initial velocity u (m/s): ";
    std::cin >> u;
    std::cout << "Acceleration a (m/s^2): ";
    std::cin >> a;
    std::cout << "Time t (s): ";
    std::cin >> t;

    std::cout << std::fixed << std::setprecision(3);

    if (choice == 1) {
        double v = u + a * t;
        std::cout << "Final velocity v = " << v << " m/s\n";
    } else if (choice == 2) {
        double s = u * t + 0.5 * a * t * t;
        std::cout << "Displacement s = " << s << " m\n";
    } else {
        std::cout << "Invalid choice.\n";
    }
}

void forcesMenu() {
    std::cout << "\n--- Forces & Newton's 2nd Law ---\n";
    double m, F;
    std::cout << "Mass m (kg): ";
    std::cin >> m;
    std::cout << "Net force F (N): ";
    std::cin >> F;

    if (m == 0) {
        std::cout << "Mass cannot be zero.\n";
        return;
    }

    double a = F / m;
    std::cout << std::fixed << std::setprecision(3);
    std::cout << "Acceleration a = " << a << " m/s^2\n";
}

void circularMenu() {
    std::cout << "\n--- Circular Motion ---\n";
    double m, v, r;
    std::cout << "Mass m (kg): ";
    std::cin >> m;
    std::cout << "Speed v (m/s): ";
    std::cin >> v;
    std::cout << "Radius r (m): ";
    std::cin >> r;

    if (r == 0) {
        std::cout << "Radius cannot be zero.\n";
        return;
    }

    double Fc = m * v * v / r;
    double ac = v * v / r;

    std::cout << std::fixed << std::setprecision(3);
    std::cout << "Centripetal force F_c = " << Fc << " N\n";
    std::cout << "Centripetal acceleration a_c = " << ac << " m/s^2\n";
}

int main() {
    while (true) {
        std::cout << "\n=== Physics Toolkit (C++) ===\n";
        std::cout << "1. Kinematics\n";
        std::cout << "2. Forces (Newton's 2nd Law)\n";
        std::cout << "3. Circular Motion\n";
        std::cout << "4. Quit\n";
        std::cout << "Choose (1-4): ";

        int choice;
        if (!(std::cin >> choice)) {
            break; // input error
        }

        if (choice == 1) {
            kinematicsMenu();
        } else if (choice == 2) {
            forcesMenu();
        } else if (choice == 3) {
            circularMenu();
        } else if (choice == 4) {
            std::cout << "Goodbye!\n";
            break;
        } else {
            std::cout << "Invalid choice.\n";
        }
    }

    return 0;
}
