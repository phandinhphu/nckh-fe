import type { StudentInfo } from '@/App';
import { createContext } from 'react';

interface AuthContextType {
    user: StudentInfo | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    register: () => Promise<string | void>;
    updateUser: () => Promise<void>;
    deleteUser: () => Promise<void>;
}

const Context = createContext<AuthContextType | null>(null);

export default Context;
