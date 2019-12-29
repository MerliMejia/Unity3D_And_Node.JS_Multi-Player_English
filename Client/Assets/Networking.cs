using UnityEngine;
using System.Net.Sockets;
using System;
using System.Text;

public class Networking : MonoBehaviour
{
    TcpClient client = new TcpClient();
    NetworkStream stream;

    const string IP = "192.168.0.7";
    const int PORT = 8080;

    const double memoryAmount = 5e+6;
    const int connexionLimitTime = 5000;

    public byte[] data = new byte[(int)memoryAmount];
    public bool running = false;

    private void Start()
    {
        connect((bool result) =>
        {
            if(result == true)
            {
                stream = client.GetStream();
                running = true;
            }
            else
            {
                Debug.Log("NOT CONNECTED!");
            }
        });
    }

    void executeCommand(string command)
    {
        if(command == "connected")
        {
            Debug.Log("CONNECTED!");
        }
    }

    private void Update()
    {
        if(running == true)
        {
            if (stream.DataAvailable)
            {
                int dataLeng = stream.Read(data, 0, data.Length);
                string messaje = Encoding.UTF8.GetString(data, 0, dataLeng);
                executeCommand(messaje);
            }
        }
    }

    private void connect(Action<bool> callback)
    {
        bool result = client.ConnectAsync(IP, PORT).Wait(connexionLimitTime);
        callback(result);

    }
   
}
