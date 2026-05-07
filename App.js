import { Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from './src/supabase';

export default function App(){
  const [nome, setNome] = useState('');

  async function criarUsuario(){
    const resposta = await supabase
      .from('usuarios')
      .insert([{ nome:nome }]);
    if(resposta.error){
      alert('Ocorreu um erro ao enviar os dados ao banco '+resposta.error.message);
    } else {
      alert('Deu certo');
    }
  }

  return(
    <View>
      <TextInput 
        placeholder='Insira o nome do usuário'
        value={nome}
        onChangeText={setNome}
      />
      <Button title='Enviar' onPress={criarUsuario} />
    </View>
  )
}