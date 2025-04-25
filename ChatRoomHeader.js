// Importa componentes básicos do React Native
import { View, Text, TouchableOpacity } from 'react-native'
// Importa React
import React from 'react'
// Importa o componente de navegação de tela (header) do Expo Router
import { Stack } from 'expo-router'
// Importa ícones das bibliotecas do Expo
import { Entypo, Ionicons } from '@expo/vector-icons'
// Importa funções para tornar medidas responsivas
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// Importa componente de imagem do Expo com otimizações
import { Image } from 'expo-image'

// Componente que define o cabeçalho da sala de chat
export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: '', // Deixa o título do header vazio
        headerShadowVisible: false, // Remove a sombra do cabeçalho

        // Define o conteúdo à esquerda do cabeçalho
        headerLeft: () => (
          <View className="flex-row items-center gap-4"> {/* Layout horizontal com espaçamento */}
            <TouchableOpacity onPress={() => router.back()}> {/* Botão de voltar */}
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3"> {/* Mostra avatar e nome do usuário */}
              <Image 
                source={user?.profileUrl} // Imagem de perfil do usuário
                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }} // Redonda e responsiva
              />
              <Text style={{ fontSize: hp(2.5) }} className="text-neutral-700 font-medium">
                {user?.username} {/* Nome do usuário */}
              </Text>
            </View>
          </View>
        ),

        // Define o conteúdo à direita do cabeçalho
        headerRight: () => (
          <View className="flex-row items-center gap-8"> {/* Ícones de ligação e vídeo */}
            <Ionicons name="call" size={hp(2.8)} color={'#737373'} />
            <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} />
          </View>
        )
      }}
    />
  )
}
