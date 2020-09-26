/**
 * Autor: Merli Mejia
 * Email: merlimejia2@gmail.com
 * <summary>
 * This class will handle all the connection between the client and the server
 * </summary>
 */

using UnityEngine;//Unity
using System.Net.Sockets;//Socket communication library
using System.Text;//For encoding and decoding data
using System;//For using the Action interface

public class Networking : MonoBehaviour
{
    TcpClient client = new TcpClient();//TCP client instance
    NetworkStream stream;//We use it for writing and reading from the server.

    const string IP = "192.168.0.6";//Server IP
    const int PORT = 8080;//Server listening port
    const double memory = 5e+6;//this means 5mb in bytes
    const int connexionLimitTime = 5000;//Connexion limit time in milliseconds

    public byte[] data = new byte[(int)memory];//Where we storage the data comming from the server
    public bool running = false;//To know if the client loop is running

    public string id = ""; //unique client id
    public bool reading = false;// to know if we're reading from the server
    public bool writing = false;// to know if we're writing from the server
    public bool searchingMatch = false;// to know if we're searching a match
    public bool connected = false; // to know if we're connected to the server

    private void Start()
    {
        //We try to connect to the server
        connect((bool res) =>
        {
            if (res == true)
            {
                connected = true;
                stream = client.GetStream();
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
     * This function do something depending of the command
     * <paramref name="command"/> command that will be executed
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
     * This method is called every time we finish reading from the server
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
     * This function write something to the server
     * <paramref name="command"/> command to be written in the server
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
     * This method is called every time we finish wrtting to the server
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
            if (stream.DataAvailable)// to know if something is comming from the server
            {
                reading = true;
                stream.BeginRead(data, 0, data.Length, new AsyncCallback(readingDone), stream);
            }
        }
    }

    /**
     * 
     * <summary>
     * This method try to connect to the server for a limmited time <see cref="connexionLimitTime"/>
     * <paramref name="callback"/> Gets executed after connecting to the server or after connextion limit is done
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
