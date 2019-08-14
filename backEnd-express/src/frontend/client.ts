var JWT = "";

// // User controller

// Create a new user account
var createUser = (user_email: string, user_pass: string, user_name: string | null, user_pic: string | null, user_bio: string | null) => {
    (async () => {
        const data = {
            email: user_email,
            password: user_pass,
            name: user_name,
            bio: user_bio,
            pic: user_pic
        };
        const response = await fetch(
            "http://localhost:8080/api/v1/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}



// // Auth controller

// Returns an auth token
var authUser = (user_email: string, user_pass: string) => {
    (async () => {
        const data = {
            email: user_email,
            password: user_pass
        };
        const response = await fetch(
            "http://localhost:8080/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        JWT = json.token;
        console.log(json);
    })();
}



// // Tweets controllers

// Creates a new tweet
var createTweet = (ref_user: number, title_tweet: string | null, content_tweet: string, image_tweet: string | null) => {
    (async () => {
        const data = {
            referenceUser: ref_user,
            title: title_tweet,
            content: content_tweet,
            imageUrl: image_tweet
        };
        const response = await fetch(
            "http://localhost:8080/api/v1/tweets",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": JWT
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}


// Deletes a tweet by ID
var deleteTweet = (tweet_id: number) => {
    (async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/tweets/${tweet_id}`,
            {
                method: "DELETE",
                headers: {
                    "x-auth-token": JWT
                }
            }            
        );
        const json = await response.json();
        console.log(json);
    })();
}


// Likes tweet
var likeTweet = (tweet_id: number) => {
    (async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/tweets/${tweet_id}/like`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": JWT
                },
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}



// // // // // // // // // // // // // // // //
// Downvotes tweet
var downvoteTweet = (tweet_id: number) => {
    (async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/tweets/${tweet_id}/downvote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": JWT
                },
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}
// // // // // // // // // // // // // // // //



// // Comment controller

// Create a new comment
var createComment = (ref_user: number, ref_tweet: number, texto: string) => {
    (async () => {
        const data = {
            referenceUser: ref_user,
            referenceTweet: ref_tweet,
            content: texto
        };
        const response = await fetch(
            "http://localhost:8080/api/v1/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": JWT
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}


// Updates the content of a comment
var updateComment = (comment_id: number, texto: string) => {
    (async () => {
        const data = {
            content: texto
        };
        const response = await fetch(
            `http://localhost:8080/api/v1/comments/${comment_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": JWT
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}


// Deletes a comment by ID
var deleteCommentById = (comment_id: number) => {
    (async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/comments/${comment_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": JWT
                },
            }
        );
        const json = await response.json();
        console.log(json);
    })();
}



// // Running the functions

// Creating users
createUser("paulinha@sinfronteras.cct", "secret", "Maria Callas",
           "http://perso.sinfronteras.ws/images/9/9e/Maria_callas1.jpg",
           "Maria Anna Cecilia Sofia Kalogeropoúlos (Nueva York, Estados Unidos), más conocida como Maria Callas, es una soprano griega considerada la cantante de ópera más eminente del siglo XX. Capaz de revivir el bel canto en su corta pero importante carrera, fue llamada «La Divina» (como antes la célebre Claudia Muzio) por su extraordinario talento vocal y actoral."
           );

createUser("adeloaleman@sinfronteras.cct", "secret", "Muhammad Ali",
           "http://perso.sinfronteras.ws/images/0/0a/Muhammad_ali3.jpg",
           "Muhammad Ali (born Cassius Marcellus Clay Jr.; January 17, 1942) is an American professional boxer, activist, and philanthropist. He is nicknamed -The Greatest- and is widely regarded as one of the most significant and celebrated sports figures of the 20th century and as one of the greatest boxers of all time.");

createUser("remo@sinfronteras.cct", "secret", "Silvio Rodríguez",
           "http://perso.sinfronteras.ws/images/a/a7/Silvio1.jpg",
           "Silvio Rodríguez, San Antonio de los Baños, 29 de noviembre de 1946. Es un cantautor, guitarrista y poeta cubano, exponente característico de la música de su país surgida con la Revolución cubana, conocida como la Nueva Trova, que comparte con otros reconocidos cantautores tales como Pablo Milanés, Noel Nicola y Vicente Feliú."
           );

createUser("edna@sinfronteras.cct", "secret", "Evita Perón",
           "http://perso.sinfronteras.ws/images/5/5b/Evita.jpg",
           "María Eva Duarte de Perón. First Lady of Argentina from 1946 until 1952. She is usually referred to as Eva Perón or Evita. She was born in poverty in the rural village of Los Toldos, in the Pampas, as the youngest of five children. At 15 in 1934, she moved to the nation's capital of Buenos Aires to pursue a career as a stage, radio, and film actress."
           );

createUser("justin@sinfronteras.cct", "secret", "Alí Primera",
           "http://perso.sinfronteras.ws/images/f/f6/Ali_primera1.jpg",
           "Alí Rafael Primera Rosell. Is a Venezuelan musician, composer, poet, and political activist. He was born in Coro, Falcón State, Venezuela and died in Caracas. He was one of the best known representatives of Nueva canción ('new song') in Venezuela – his songs 'condemning exploitation and repression, and celebrating resistance, struck a chord among a wide public' and he is known in Venezuela as El Cantor del Pueblo (The People's Singer)."
           );


// User authentication (Generationg of the JSON Web Token (JWT))
authUser("paulinha@sinfronteras.cct", "secret");


// Creating tweets
// 1
createTweet(1,
            "React",
            "We have just released React 16.8 with a stable version of Hooks. React Hooks let you use features like local state and lifecycle without writing a class. They’re fully backwards-compatible and you can start using them today.",            
            "https://miro.medium.com/max/3200/1*qXcjSfRj0C0ir2yMsYiRyw.jpeg"
            );

// 2            
createTweet(3,
            "Salsa - Willie Colon and Ruben Blades - 'Plástico'",    
            "Willie Colon and Ruben Blade's 'Plastico' was originally released on the album 'Siembra' in 1978 and was composed by Ruben Blades. Un clasico! esto no es un genero, es un movimiento social. Que viva su majestad #Salsa y los salseros del mundo #SalserosPorSiempre. Saludos desde Dublin",
            "http://perso.sinfronteras.ws/images/4/44/Ruben1.jpg"
            );

// 3            
createTweet(2,
            "The Linux Foundation",
            "The Linux Foundation: Share your open source technical or leadership expertise at the largest open source conference in Europe. Tracks on Cloud Infrastructure, AI/ML, Linux, Embedded & IoT and much more. View topics and submit before July 1 at http://bit.ly/eu19cfp  #opensource #linux #AI",
            "http://perso.sinfronteras.ws/images/7/71/I_love_Linux.png"
            );


// 4            
createTweet(4,
            "Silvio Rodriguez - Rabo de Nube",
            "Si me dijeran: pide un deseo. Preferiría un rabo de nube. Un torbellino en el suelo; y una gran ira que sube. Un barredor de tristezas, un aguacero en venganza, que cuando escampe, parezca nuestra esperanza.",
            "http://perso.sinfronteras.ws/images/3/3b/Silvio3.jpg"
            );

// 5            
createTweet(5,
            "The Greatest - Muhammad Ali",    
            "When this man died, no matter how much you were into boxing, how much you were into sport at all, no matter how much you looked up to him-everybody, who had the eyes to see, the mind to understand and the soul to feel-felt something. The whole world felt something. To me, this is the difference between great athletes and sheer legendary mircle. He touched the human race, and will be dearly missed. Respect and I hope his spirit has found tranquility.",
            "http://perso.sinfronteras.ws/images/c/cd/Muhammad_ali2.png"
            );

// 6            
createTweet(1,
            "Comparison of top data science libraries for Python, R and Scala",    
            "Data science is a promising and exciting field, developing rapidly. The area of data science use cases and influence is continuously expanding, and the toolkit to implement these applications is growing fast. Therefore data scientists should be aware of what are the best solutions for the particular tasks.",
            null
            );

// 7
createTweet(2,
            "Chuao Chocolatier",    
            "Chuao - Venezuela: I particularly enjoy all things chocolate, boring I know. Right now my main squeeze is Chuao Chocolatier candy bars - especially the s'mores and pretzel toffee twirl!",
            "http://perso.sinfronteras.ws/images/d/da/Chuao1.jpg"
            );
    
// 8
createTweet(3,
            "Top 10 Water Polo Goals of the Olympic Games",
            "Enjoy the Top 10 Olympic water polo goals featuring: Melania Grego (Italy), Adam Steinmetz (Hungary), Felipe Perrone (Spain), Suzie Fraser (Australia), Daniëlle de Bruijn (Netherlands), Renato Vrbicic (Croatia), Yvette Higgins (Australia), Elisa Casanova (Italy), Attila Vári (Hungary), and Márton Szivós (Hungary).",
            null
            );


// Creating comments
// 1
createComment(2, 1,
    "It would be nice to mention the disadvantages of a Library vs a Framework too. You mentioned 'Being able to choose the libraries that you prefer as an advantage', I agree but it is an advantage only when you are experienced enough. Having to choose libraries is difficult when you're a beginner."
    );
    
createComment(3, 1,
    "You mentioned that Angular is a framework while React is a library, but what about Vue? specially now we have Vue JS and Vue cli."
    );

createComment(1, 1,
    "Material UI is a set of components created by Google, that implements their famous Material Design. With over 36k stars on Github, it’s the most popular UI package of all React libraries. It’s simple, eye-catching, light and user-friendly. It’s already been around for a couple of years, but thanks to constant updates, it hasn’t lost its popularity."
    );


// 2
createComment(1, 2,
    "La realidad de esta canción perdurará hasta el fin de los tiempos. Se ven la caras pero nunca el corazón..."
    );

createComment(2, 2,
    "Difícilmente se podrá escuchar una pieza más comprometida y auténtica que ésta de Ruben, es un himno, el despertar de una raza que ha dejado de dormir y que se levanta con una conciencia de libertad"
    );

createComment(3, 2,
    "Me acuerdo cuando mi papá se apareció una tarde del 1978 con el LP de siembra nuevecito, corte el plástico y saque el LP, le puse la aguja encima y quedé facinado. Tenia 10 años de edad.."
    );

createComment(4, 2,
    "Era una ciudad de plástico, de esas que no quiero ver. De edificios cancerosos, y un corazón de oropel. Donde en vez de un sol amanece un dólar. Donde nadie ríe, donde nadie llora. Con gente de rostros de poliéster; que escuchan sin oír y miran sin ver. Gente que vendió por comodidad, su razón de ser y su libertad..."
    );


// 3
createComment(3, 3,
    "Windows to Linux Playlist: https://www.youtube.com/playlist?list=PLc7fktTRMBoz7n-ugZm2Ndi0np_Y4Hh1k  Linux Beating Windows in FPS: https://www.youtube.com/watch?v=13BQljK9ZwM"
    );

createComment(4, 3,
    "It is only a matter of time before Windows users try Linux and discover for themselves that the Linux stereotypes from 1991 that are still a thing for some reason are completely untrue."
    );
    
createComment(5, 3,
    "We need computer manufacturers to sell more computers with Linux. Not only will it make computers cheaper (no windows keys) and it will influence the switch to Linux."
    );    


// 5    
createComment(5, 5,
    "The most well known person around the whole world. He will always be the real champion. Thank you Mohammad."
    );    

createComment(4, 5,
    "He was crazy enough, he was foolish, he was hungry, he was original, he did it. His best wins happened when nobody could think of seeing him won. That's what made him different. When he was not able to beat Liston, Frazier, Norton, Foreman, he followed his heart. He showed us your heart has many things to say, and fear is just a delusion, He made it. What an incredible man..."
    );    

createComment(2, 5,
    "Muhammad Ali fue mucho más que un boxeador..."
    );    


// 8
createComment(4, 8,
    "Never watched water polo before somehow this ended up in my recommended"
    );

createComment(3, 8,
    "Mamu vam jebem u picku Srbija vas kara redom a vi pustili kad gubi od Australije..."
    );    

createComment(5, 8,
    "As a water polo player, I would guarantee it is a hard sport, maybe hardest in world..."
    );    
    
    

// Updating the content of a comment
updateComment(5,"Updating the comment 5");
updateComment(2,"Updating the comment 2");

// Like and Downvote
likeTweet(1);
likeTweet(2);
downvoteTweet(3);
downvoteTweet(4);
downvoteTweet(2);

// Deleting a tweet
deleteTweet(6);
deleteTweet(2);

// Deleting a comment
deleteCommentById(4);
deleteCommentById(1);