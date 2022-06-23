using System;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace consumidor
{
    class Program
    {
        static void Main(string[] args)
        {
                        //iniciando o connectionFactory:
            ConnectionFactory factory = new ConnectionFactory{
                HostName = "localhost"
            };
            //utilizando o using:
            using(var connection = factory.CreateConnection())
            {
                using(var channel = connection.CreateModel()){
                    channel.QueueDeclare(
                        queue : "fila_python",
                        durable: false,
                        exclusive: false,
                        autoDelete:false,
                        arguments: null
                    );
                    
                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, message) => {
                        //pode ser var também
                        byte[] body = message.Body.ToArray();
                        var text = Encoding.UTF8.GetString(body);
                        Console.WriteLine(text);
                    };
                    
                   channel.BasicConsume(queue : "fila_python",
                                        autoAck : true,
                                        consumer: consumer);
                    
                    Console.WriteLine("Fim do consumo");

                }
            }
        }
    }
}
