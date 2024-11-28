import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebaseConfig"; // Certifique-se de que o caminho está correto

const Home: React.FC = () => {
  const [sensorData, setSensorData] = useState<any[]>([]); // Usando `any[]` para dados genéricos
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados do Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Buscando dados do Firestore...");
        const querySnapshot = await getDocs(collection(firestore, "SensorData"));
        
        if (querySnapshot.empty) {
          console.log("Nenhum documento encontrado.");
          setError("Nenhum dado encontrado.");
          setLoading(false);
          return;
        }

        // Mapeando os dados recebidos
        const data = querySnapshot.docs.map((doc) => {
          console.log("Documento:", doc.id, doc.data()); // Logando cada documento
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        console.log("Dados mapeados:", data);
        setSensorData(data); // Atualizando o estado com os dados
        setLoading(false); // Finalizando o carregamento
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setError("Erro ao buscar dados.");
        setLoading(false); // Finalizando o carregamento em caso de erro
      }
    };

    fetchData(); // Executando a busca de dados
  }, []);

  // Renderização condicional baseada no estado
  return (
    <div>
      {loading && <p>Carregando...</p>} {/* Mostra "Carregando..." enquanto os dados são buscados */}
      {error && <p>{error}</p>} {/* Exibe a mensagem de erro caso haja */}
      {!loading && !error && (
        <ul>
          {sensorData.length === 0 ? (
            <li>Nenhum dado encontrado.</li> // Se não houver dados, exibe esta mensagem
          ) : (
            sensorData.map((item) => (
              <li key={item.id}>
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Data:</strong> {item.date}</p>
                <p><strong>Temperatura:</strong> {item.temp}</p>
                <p><strong>Umidade:</strong> {item.hmd}</p>
                <p><strong>Hora:</strong> {item.time}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Home;
