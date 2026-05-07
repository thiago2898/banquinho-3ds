import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from './src/supabase';

export default function App() {
  const [desejo, setDesejo] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lista, setLista] = useState([])
  const [certo, setCerto] = useState(false);
  const [loading, setLoading] = useState(false)


  async function inserirRegistro() {
    const resposta = await supabase
      .from('listadesejos')
      .insert([{
        titulo: desejo,
        descricao: detalhes
      }]);
    if (resposta.error) {
      alert('Ocorreu um erro ao enviar os dados ao banco ' + resposta.error.message);
    } else {
      alert('Deu certo');
    }
  }



  async function showDesejos() {
    try {
      setLoading(true);
      setCerto(!certo);

      const { data, error } = await supabase
        .from('listadesejos')
        .select("*")

      setLista(data || [])

      if (error) throw error;

    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

if (loading) {
  return (
    <View>
      <Text>Carregando...</Text>
    </View>
  );
}

return (
  <View>
    <TextInput
      placeholder='Insira o seu desejo'
      value={desejo}
      onChangeText={setDesejo}
    />

    <TextInput
      placeholder='Insira a sua descrição'
      value={detalhes}
      onChangeText={setDetalhes}
    />

    {certo && <FlatList
      data={lista}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>Título: {item.titulo}</Text>
          <Text>Descrição: {item.descricao}</Text>
        </View>
      )}
    />}

    <Button title='Enviar' onPress={inserirRegistro} />
    <Button title='Mostrar os bagui' onPress={showDesejos} />
  </View>
  )
}