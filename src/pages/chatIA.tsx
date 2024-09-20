import React, { useEffect, useState } from "react";
import { HumeClient, fetchAccessToken } from "hume";
import { useVoice, VoiceProvider } from "@humeai/voice-react";
import ChatStage from "@components/ui/chatStage";

function ChatIA() {
  const [accessToken, setAccessToken] = useState("");
  const [transcript, setTranscript] = useState(""); // Estado para almacenar la transcripción.
  const [confirmedData, setConfirmedData] = useState(null); // Estado para datos confirmados.
  const [loading, setLoading] = useState(false); // Estado para manejar la carga.
  const [error, setError] = useState(""); // Estado para manejar errores.
  const [successMessage, setSuccessMessage] = useState(""); // Estado para manejar mensajes de éxito.

  const apiKey = import.meta.env.VITE_HUME_API_KEY;
  const secretKey = import.meta.env.VITE_HUME_SECRET_KEY;
  const configId = "879850cf-499d-4854-8abf-183f0639bd3d";

  useEffect(() => {
    // Función para obtener el token de acceso.
    const fetchToken = async () => {
      try {
        setLoading(true); // Iniciar carga.
        const token = (await fetchAccessToken({ apiKey, secretKey })) || "";
        setAccessToken(token);
        setLoading(false); // Finalizar carga.
      } catch (error) {
        setLoading(false);
        setError(
          "Error al obtener el token de acceso. Por favor, verifica tus credenciales e inténtalo de nuevo."
        );
        console.error("Error al obtener el token de acceso:", error);
      }
    };

    fetchToken();

    // Conexión al WebSocket
    const connectToWebSocket = async () => {
      const client = new HumeClient({ apiKey, secretKey });

      try {
        setLoading(true); // Iniciar carga para conexión WebSocket.
        const socket = await client.empathicVoice.chat.connect({
          configId: configId,
        });

        // Manejo de mensajes recibidos del WebSocket.
        socket.on("message", (message) => {
          console.log(message);
          if (
            typeof message === "object" &&
            message !== null &&
            message?.message?.content
          ) {
            setTranscript((prev) => {
              return prev + message?.message?.content + " "; // Concatenar transcripción.
            }); // Guardar transcripción recibida.
          } else {
            setError("Tipo de mensaje no esperado desde el servidor.");
            console.warn("Tipo de mensaje no esperado:", typeof message);
          }
          setLoading(false); // Finalizar carga después de recibir mensaje.
        });

        // Manejo de errores del WebSocket.
        socket.on("error", (error) => {
          setError(
            "Error en la conexión del WebSocket. Por favor, intenta de nuevo más tarde."
          );
          console.error("Error en el WebSocket:", error);
          setLoading(false); // Finalizar carga en caso de error.
        });

        // Cerrar la conexión después de un tiempo de inactividad
        socket.on("close", () => {
          setError("Conexión cerrada por inactividad. Intenta reconectarte.");
          setLoading(false); // Finalizar carga cuando se cierra la conexión.
        });
      } catch (error) {
        setError("Error al conectar con WebSocket. Revisa tu configuración.");
        console.error("Error al conectar con WebSocket:", error);
        setLoading(false); // Finalizar carga en caso de error.
      }
    };

    connectToWebSocket();
  }, [apiKey, secretKey]);

  // Función para confirmar los datos y enviarlos al backend
  const confirmData = async () => {
    if (transcript) {
      setConfirmedData(transcript); // Almacenar transcripción confirmada
      try {
        setLoading(true); // Iniciar carga al enviar datos.
        setError(""); // Limpiar mensajes de error previos.
        setSuccessMessage(""); // Limpiar mensajes de éxito previos.

        const response = await fetch("https://tu-backend.com/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: transcript }),
        });

        if (response.ok) {
          setSuccessMessage("Datos confirmados y enviados correctamente.");
        } else {
          setError(
            "Error al enviar datos al backend. Por favor, inténtalo de nuevo."
          );
        }
      } catch (error) {
        setError(
          "Error en la solicitud al backend. Verifica tu conexión e inténtalo de nuevo."
        );
        console.error("Error en la solicitud al backend:", error);
      } finally {
        setLoading(false); // Finalizar carga.
      }
    } else {
      setError("No hay datos para confirmar.");
    }
  };

  return (
    <>
      {accessToken ? (
        <VoiceProvider
          auth={{ type: "accessToken", value: accessToken }}
          configId={configId}
        >
          <Messages /> {/* Componente para mostrar mensajes */}
          <ChatStage /> {/* Componente que manejará el chat */}
          {transcript && (
            <div>
              <h3>Transcripción Recibida</h3>
              <p>{transcript}</p>
              <button onClick={confirmData} disabled={loading}>
                {" "}
                {/* Deshabilitar botón durante carga */}
                Confirmar y Enviar Datos
              </button>
            </div>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}{" "}
          {/* Mostrar errores */}
          {successMessage && (
            <div style={{ color: "green" }}>{successMessage}</div>
          )}{" "}
          {/* Mostrar éxito */}
          {loading && <p>Procesando...</p>} {/* Mostrar mensaje de carga */}
        </VoiceProvider>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}

const Messages = () => {
  const { messages } = useVoice();
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="p-10 bg-white min-w-1/2 z-50 rounded shadow-md shadow-gray-500">
        {messages.map((msg, index) => {
          if (msg.type === "user_message" || msg.type === "assistant_message") {
            return (
              <div key={msg.type + index}>
                <div className="text-black bg-blue-500 rounded p-2 w-fit mt-5 mb-3">
                  {msg.message.role}
                </div>
                <div className="text-black">{msg.message.content}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatIA;
