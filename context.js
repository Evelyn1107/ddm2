// Importação de hooks e funções do React e Firebase
import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,             // Observa mudanças de autenticação
    createUserWithEmailAndPassword, // Cria novo usuário com e-mail e senha
    signInWithEmailAndPassword,     // Faz login com e-mail e senha
    signOut                         // Faz logout
} from 'firebase/auth';
import { auth, db } from "../firebaseConfig"; // Importa as instâncias de autenticação e banco de dados do Firebase
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Funções para manipular documentos no Firestore

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Provedor do contexto de autenticação
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);             // Estado do usuário logado
    const [isAuthenticated, setIsAuthenticated] = useState(undefined); // Estado de autenticação (true, false, ou undefined)

    // Hook que observa mudanças no estado de autenticação
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Se houver usuário logado, define como autenticado
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid); // Atualiza dados adicionais do usuário (como username)
            } else {
                // Se não houver usuário logado
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unsub; // Desinscreve o listener ao desmontar o componente
    }, []);

    // Função que busca dados adicionais do usuário no Firestore
    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);      // Referência ao documento do usuário
        const docSnap = await getDoc(docRef);         // Busca o documento

        if (docSnap.exists()) {
            let data = docSnap.data();
            // Atualiza o estado do usuário com os dados adicionais
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });
        }
    }

    // Função de login com e-mail e senha
    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            // Tratamento de erros comuns
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/invalid-credential)')) msg = 'E-mail ou Senha errada';
            return { success: false, msg };
        }
    }

    // Função de logout
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    }

    // Função de cadastro de novo usuário
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            // Cria um documento no Firestore com os dados adicionais do usuário
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });

            return { success: true, data: response?.user };
        } catch (e) {
            let msg = e.message;
            // Tratamento de erros comuns
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Esse e-mail já está em uso';
            return { success: false, msg };
        }
    }

    // Provedor com os dados e funções disponíveis para o contexto
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para usar o AuthContext com segurança
export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}
