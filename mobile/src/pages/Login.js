import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text, KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [techs, setTechs] = useState(null);

    // Redireciona o usuário já logado para a rota List
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user => {
            if(user) navigation.navigate('List');
        });
    }, []);
    
    async function formSubmit() {
        const response = await api.post('/sessions', {
            email,
            password
        });
        console.log("techs", techs);
        if(response.data.error){
            alert("Erro ao acessar a conta!!");
        } else if(!techs){
            alert("Inserir ao menos uma tecnologia");
        } else {
            const { _id } = response.data;

            await AsyncStorage.setItem('user', _id);
            await AsyncStorage.setItem('techs', techs);

            navigation.navigate('List');
        }
    }

    return ( 
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>EMAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="seu@email.com.br"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>SENHA *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    textContentType="password"
                    autoCapitalize="words"
                    secureTextEntry={true}
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Suas tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity onPress={formSubmit} style={styles.btn}>
                    <Text style={styles.btnTexto}>Logar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2

    },
    btn: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    btnTexto:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});