import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Context from './Context';
import type { StudentInfo } from '@/App';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<StudentInfo | null>(null);
    useEffect(() => {
        // handle initial auth state check
        // create new user object and set it to user state
        const user = {
            name: 'Nguyễn Văn A',
            studentId: 'SV2021001',
            major: 'Công nghệ thông tin',
            year: 'Năm 3',
            gpa: 3.45,
            completedCredits: 80,
            totalCredits: 130,
            expectedGraduation: '2025-06-30',
        };
        setUser(user);
    }, []);

    const handleLogin = async () => {
        // handle login logic
    };

    const handleLogout = async () => {
        // handle logout logic
    };

    const handleRegister = async () => {
        // handle register logic
    };

    const handleUpdateUser = async () => {
        // handle update user logic
    };

    const handleDeleteUser = async () => {
        // handle delete user logic
    };

    return (
        <Context.Provider
            value={{
                user: user,
                login: handleLogin,
                logout: handleLogout,
                register: handleRegister,
                updateUser: handleUpdateUser,
                deleteUser: handleDeleteUser,
            }}
        >
            {children}
        </Context.Provider>
    );
};
