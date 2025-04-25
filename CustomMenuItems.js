// Importa componentes básicos do React Native
import { Text, View } from 'react-native';
// Importa o componente MenuOption do react-native-popup-menu (representa uma opção de menu)
import { MenuOption } from 'react-native-popup-menu';
// Importa funções para deixar o layout responsivo com base nas dimensões da tela
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Componente MenuItem que representa uma opção personalizada no menu
export const MenuItem = ({ text, action, value, icon }) => {
    return (
        // Cada item de menu chama 'action' passando o 'value' ao ser selecionado
        <MenuOption onSelect={() => action(value)}>
            <View className="px-4 py-1 flex-row justify-between items-center">
                {/* Texto da opção */}
                <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">
                    {text}
                </Text>
                {/* Ícone opcional à direita do texto (se fornecido) */}
                {icon}
            </View>
        </MenuOption>
    );
}
