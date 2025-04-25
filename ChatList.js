// Importa componentes do React Native
import { View, Text, FlatList } from 'react-native'
// Importa React
import React from 'react'
// Importa o componente que representa cada item da lista de chats
import ChatItem from './ChatItem'
// Hook de navegação do Expo Router
import { useRouter } from 'expo-router'

// Componente ChatList que recebe a lista de usuários (users) e o usuário atual (currentUser)
export default function ChatList({users, currentUser}) {
    const router = useRouter(); // Inicializa o roteador para navegação entre telas

    return (
        <View className="flex-1"> {/* Container principal que ocupa a tela toda */}
            <FlatList
                data={users} // Lista de usuários a ser exibida
                contentContainerStyle={{flex: 1, paddingVertical: 25}} // Estilo do conteúdo interno da lista
                keyExtractor={item => Math.random()} // Gera uma chave aleatória para cada item (não recomendado!)
                showsVerticalScrollIndicator={false} // Oculta a barra de rolagem vertical
                renderItem={({item, index}) => (
                    <ChatItem 
                        noBorder={index + 1 === users.length} // Remove borda do último item
                        router={router}                      // Passa o roteador para navegação
                        currentUser={currentUser}            // Passa o usuário atual
                        item={item}                          // Dados do usuário do item atual
                        index={index}                        // Índice do item
                    />
                )}
            />
        </View>
    )
}
