/**
 * Autor: Merli Mejia
 * Email: merlimejia2@gmail.com
 * <summary>
 * Esta clase sera la encargada de manejar todo lo que tiene que ver con el 
 * Networking de nuestro juego
 * </summary>
 */

using UnityEngine;//Unity
using System.Net.Sockets;//Libreria que nos permite usar Sockets
using System;//Lo necesitamos para usar las interfaces Actions
using System.Text;//Lo necesitamos para decodificar los bytes provenientes del servidor
using System.Threading.Tasks;

public class Networking : MonoBehaviour
{
    TcpClient client = new TcpClient();//Instancia de nuestro client TCP
    NetworkStream stream;//Lo usamos para leer y escribir en el servidor

    const string IP = "192.168.0.6";//Direccion IP del servidor(al principio sera la ip de tu pc)
    const int PORT = 8080;//PORT en el cual esta running el servidor
    const double memory = 5e+6;//Significa 5mbs en bytes
    const int connexionLimitTime = 5000;//Tiempo limite de conexion en milisegundos

    public byte[] data = new byte[(int)memory];//Donde almacenamos lo que viene del servidor
    public bool running = false;//Para saber si el client esta running

    public string id = "";
    public bool reading = false;
    public bool writing = false;
    public bool searchingMatch = false;
    public bool connected = false;

    private void Start()
    {
        //Intentamos connectnos al servidor
        connect((bool res) =>
        {
            if (res == true)
            {
                connected = true;
                stream = client.GetStream();//Obtenemos la instancia del stream de la conexion
                running = true;
            }
            else
            {
                Debug.LogError("CONNEXION FAILED");
            }
        });
    }

    /**
     * <summary>
     * Este metodo hace algo dependiendo el command que le pasen
     * <paramref name="command"/> command a ejecutar
     * </summary>
     * 
     */
    public void readCommand(string command)
    {
        if (command == "connected")
        {
            Debug.Log("CONNECTED");
        }

        if (command.StartsWith("id:"))
        {
            id = command.Replace("id: ", "");
            Debug.Log("ID RECIVED");
            writeCommand("SEARCH_MATCH");
        }
    }

    /**
     * <summary>
     * Este metodo se ejecuta cada vez que se termina de leer algo proveniente del servidor
     * </summary>
     * 
     */
    void readingDone(IAsyncResult arr)
    {
        reading = false;
        int t = stream.EndRead(arr);
        string message = Encoding.UTF8.GetString(data, 0, t);
        readCommand(message);
    }

    /**
     * <summary>
     * Este metodo manda un message al servidor
     * <paramref name="command"/> command a escribir
     * </summary>
     * 
     */
    void writeCommand(string command)
    {
        if (command == "SEARCH_MATCH") searchingMatch = true;
        writing = true;
        stream.BeginWrite(Encoding.UTF8.GetBytes(command), 0, command.Length, new AsyncCallback(writtingDone), stream);
    }

    /**
     * <summary>
     * Este metodo se ejecuta cada vez que se termina de escribir en el servidor
     * </summary>
     * 
     */

    void writtingDone(IAsyncResult arr)
    {
        writing = false;
        stream.EndWrite(arr);
    }

    private void Update()
    {

        if (running == true)
        {
            if (stream.DataAvailable)//Asi sabemos si el servidor ha enviado algo
            {
                reading = true;
                stream.BeginRead(data, 0, data.Length, new AsyncCallback(readingDone), stream);
            }
        }
    }

    /**
     * 
     * <summary>
     * Este metodo intenta connectse al servidor durante un tiempo limite ya definido <see cref="connexionLimitTime"/>
     * <paramref name="callback"/> se ejecuta despues de haber intentado connectse al servidor y devuelve un bool dependiendo de si se conecto o no
     * </summary>
     * 
     */
    private void connect(Action<bool> callback)
    {
        bool resultado = client.ConnectAsync(IP, PORT).Wait(connexionLimitTime);
        callback(resultado);
    }

    private void OnApplicationQuit()
    {
        running = false;
    }


}
