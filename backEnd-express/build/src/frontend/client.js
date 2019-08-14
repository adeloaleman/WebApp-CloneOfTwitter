"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var JWT = "";
// // User controller
// Create a new user account
var createUser = function (user_email, user_pass, user_name, user_pic, user_bio) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        email: user_email,
                        password: user_pass,
                        name: user_name,
                        bio: user_bio,
                        pic: user_pic
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // Auth controller
// Returns an auth token
var authUser = function (user_email, user_pass) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        email: user_email,
                        password: user_pass
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    JWT = json.token;
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // Tweets controllers
// Creates a new tweet
var createTweet = function (ref_user, title_tweet, content_tweet, image_tweet) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        referenceUser: ref_user,
                        title: title_tweet,
                        content: content_tweet,
                        imageUrl: image_tweet
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": JWT
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Deletes a tweet by ID
var deleteTweet = function (tweet_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets/" + tweet_id, {
                        method: "DELETE",
                        headers: {
                            "x-auth-token": JWT
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Likes tweet
var likeTweet = function (tweet_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets/" + tweet_id + "/like", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": JWT
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // // // // // // // // // // // // // // //
// Downvotes tweet
var downvoteTweet = function (tweet_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/tweets/" + tweet_id + "/downvote", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": JWT
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // // // // // // // // // // // // // // //
// // Comment controller
// Create a new comment
var createComment = function (ref_user, ref_tweet, texto) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        referenceUser: ref_user,
                        referenceTweet: ref_tweet,
                        content: texto
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/comments", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": JWT
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Updates the content of a comment
var updateComment = function (comment_id, texto) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        content: texto
                    };
                    return [4 /*yield*/, fetch("http://localhost:8080/api/v1/comments/" + comment_id, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "x-auth-token": JWT
                            },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// Deletes a comment by ID
var deleteCommentById = function (comment_id) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/api/v1/comments/" + comment_id, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": JWT
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log(json);
                    return [2 /*return*/];
            }
        });
    }); })();
};
// // Running the functions
// Creating users
createUser("paulinha@sinfronteras.cct", "secret", "Maria Callas", "https://iadsb.tmgrup.com.tr/823e6e/645/344/2/146/761/550?u=https://idsb.tmgrup.com.tr/2017/09/15/1505426392703.jpg", "Maria Anna Cecilia Sofia Kalogeropoúlos (Nueva York, Estados Unidos), más conocida como Maria Callas, es una soprano griega considerada la cantante de ópera más eminente del siglo XX. Capaz de revivir el bel canto en su corta pero importante carrera, fue llamada «La Divina» (como antes la célebre Claudia Muzio) por su extraordinario talento vocal y actoral.");
createUser("adeloaleman@sinfronteras.cct", "secret", "Muhammad Ali", "https://upload.wikimedia.org/wikipedia/commons/8/89/Muhammad_Ali_NYWTS.jpg", "Muhammad Ali (born Cassius Marcellus Clay Jr.; January 17, 1942) is an American professional boxer, activist, and philanthropist. He is nicknamed -The Greatest- and is widely regarded as one of the most significant and celebrated sports figures of the 20th century and as one of the greatest boxers of all time.");
createUser("remo@sinfronteras.cct", "secret", "Silvio Rodríguez", "http://culto.latercera.com/wp-content/uploads/2018/10/23540_preview-900x600.jpg", "Silvio Rodríguez, San Antonio de los Baños, 29 de noviembre de 1946. Es un cantautor, guitarrista y poeta cubano, exponente característico de la música de su país surgida con la Revolución cubana, conocida como la Nueva Trova, que comparte con otros reconocidos cantautores tales como Pablo Milanés, Noel Nicola y Vicente Feliú.");
createUser("edna@sinfronteras.cct", "secret", "Evita Perón", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Evita_color.jpg/170px-Evita_color.jpg", "María Eva Duarte de Perón. First Lady of Argentina from 1946 until 1952. She is usually referred to as Eva Perón or Evita. She was born in poverty in the rural village of Los Toldos, in the Pampas, as the youngest of five children. At 15 in 1934, she moved to the nation's capital of Buenos Aires to pursue a career as a stage, radio, and film actress.");
createUser("justin@sinfronteras.cct", "secret", "Alí Primera", "https://img.discogs.com/EhAK_lMRWnjaL3LLp-pW7QVP45c=/600x671/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-649487-1442955975-3084.jpeg.jpg", "Alí Rafael Primera Rosell. Is a Venezuelan musician, composer, poet, and political activist. He was born in Coro, Falcón State, Venezuela and died in Caracas. He was one of the best known representatives of Nueva canción ('new song') in Venezuela – his songs 'condemning exploitation and repression, and celebrating resistance, struck a chord among a wide public' and he is known in Venezuela as El Cantor del Pueblo (The People's Singer).");
// User authentication (Generationg of the JSON Web Token (JWT))
authUser("paulinha@sinfronteras.cct", "secret");
// Creating tweets
// 1
createTweet(1, "React", "We have just released React 16.8 with a stable version of Hooks. React Hooks let you use features like local state and lifecycle without writing a class. They’re fully backwards-compatible and you can start using them today.", "https://miro.medium.com/max/3200/1*qXcjSfRj0C0ir2yMsYiRyw.jpeg");
// 2            
createTweet(3, "Salsa - Willie Colon and Ruben Blades - 'Plástico'", "Willie Colon and Ruben Blade's 'Plastico' was originally released on the album 'Siembra' in 1978 and was composed by Ruben Blades. Un clasico! esto no es un genero, es un movimiento social. Que viva su majestad #Salsa y los salseros del mundo #SalserosPorSiempre. Saludos desde Dublin", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ojmgvFjaNOz_4VTeB2ESJca6qWQcaosNQUi8qbQp-xAj3R7f");
// 3            
createTweet(2, "The Linux Foundation", "The Linux Foundation: Share your open source technical or leadership expertise at the largest open source conference in Europe. Tracks on Cloud Infrastructure, AI/ML, Linux, Embedded & IoT and much more. View topics and submit before July 1 at http://bit.ly/eu19cfp  #opensource #linux #AI", "https://www.ibm.com/ibm/history/ibm100/images/icp/V052425X01816O41/us__en_us__ibm100__linux__icon__540x324.png");
// 4            
createTweet(4, "Silvio Rodriguez - Rabo de Nube", "Si me dijeran: pide un deseo. Preferiría un rabo de nube. Un torbellino en el suelo; y una gran ira que sube. Un barredor de tristezas, un aguacero en venganza, que cuando escampe, parezca nuestra esperanza.", "http://4.bp.blogspot.com/-ty-HitpK-MY/Vn1HVRnBX-I/AAAAAAAAb5g/cGC2UakUXQQ/w1200-h630-p-k-no-nu/SilvioRodriguez-Necio.jpg");
// 5            
createTweet(5, "The Greatest - Muhammad Ali", "When this man died, no matter how much you were into boxing, how much you were into sport at all, no matter how much you looked up to him-everybody, who had the eyes to see, the mind to understand and the soul to feel-felt something. The whole world felt something. To me, this is the difference between great athletes and sheer legendary mircle. He touched the human race, and will be dearly missed. Respect and I hope his spirit has found tranquility.", "http://perso.sinfronteras.ws/images/c/cd/Muhammad_ali2.png");
// 6            
createTweet(1, "Comparison of top data science libraries for Python, R and Scala", "Data science is a promising and exciting field, developing rapidly. The area of data science use cases and influence is continuously expanding, and the toolkit to implement these applications is growing fast. Therefore data scientists should be aware of what are the best solutions for the particular tasks.", null);
// 7
createTweet(2, "Chuao Chocolatier", "I particularly enjoy all things chocolate, boring I know. Right now my main squeeze is Chuao Chocolatier candy bars - especially the s'mores and pretzel toffee twirl!", "https://pbs.twimg.com/media/Da3StlfW4AUxONZ.jpg");
// 8
createTweet(3, "Top 10 Water Polo Goals of the Olympic Games", "Enjoy the Top 10 Olympic water polo goals featuring: Melania Grego (Italy), Adam Steinmetz (Hungary), Felipe Perrone (Spain), Suzie Fraser (Australia), Daniëlle de Bruijn (Netherlands), Renato Vrbicic (Croatia), Yvette Higgins (Australia), Elisa Casanova (Italy), Attila Vári (Hungary), and Márton Szivós (Hungary).", null);
// Creating comments
// 1
createComment(2, 1, "It would be nice to mention the disadvantages of a Library vs a Framework too. You mentioned 'Being able to choose the libraries that you prefer as an advantage', I agree but it is an advantage only when you are experienced enough. Having to choose libraries is difficult when you're a beginner.");
createComment(3, 1, "You mentioned that Angular is a framework while React is a library, but what about Vue? specially now we have Vue JS and Vue cli.");
createComment(1, 1, "Material UI is a set of components created by Google, that implements their famous Material Design. With over 36k stars on Github, it’s the most popular UI package of all React libraries. It’s simple, eye-catching, light and user-friendly. It’s already been around for a couple of years, but thanks to constant updates, it hasn’t lost its popularity.");
// 2
createComment(1, 2, "La realidad de esta canción perdurará hasta el fin de los tiempos. Se ven la caras pero nunca el corazón...");
createComment(2, 2, "Difícilmente se podrá escuchar una pieza más comprometida y auténtica que ésta de Ruben, es un himno, el despertar de una raza que ha dejado de dormir y que se levanta con una conciencia de libertad");
createComment(3, 2, "Me acuerdo cuando mi papá se apareció una tarde del 1978 con el LP de siembra nuevecito, corte el plástico y saque el LP, le puse la aguja encima y quedé facinado. Tenia 10 años de edad..");
createComment(4, 2, "Era una ciudad de plástico, de esas que no quiero ver. De edificios cancerosos, y un corazón de oropel. Donde en vez de un sol amanece un dólar. Donde nadie ríe, donde nadie llora. Con gente de rostros de poliéster; que escuchan sin oír y miran sin ver. Gente que vendió por comodidad, su razón de ser y su libertad...");
// 3
createComment(3, 3, "Windows to Linux Playlist: https://www.youtube.com/playlist?list=PLc7fktTRMBoz7n-ugZm2Ndi0np_Y4Hh1k  Linux Beating Windows in FPS: https://www.youtube.com/watch?v=13BQljK9ZwM");
createComment(4, 3, "It is only a matter of time before Windows users try Linux and discover for themselves that the Linux stereotypes from 1991 that are still a thing for some reason are completely untrue.");
createComment(5, 3, "We need computer manufacturers to sell more computers with Linux. Not only will it make computers cheaper (no windows keys) and it will influence the switch to Linux.");
// 5    
createComment(5, 5, "The most well known person around the whole world. He will always be the real champion. Thank you Mohammad.");
createComment(4, 5, "He was crazy enough, he was foolish, he was hungry, he was original, he did it. His best wins happened when nobody could think of seeing him won. That's what made him different. When he was not able to beat Liston, Frazier, Norton, Foreman, he followed his heart. He showed us your heart has many things to say, and fear is just a delusion, He made it. What an incredible man...");
createComment(2, 5, "Muhammad Ali fue mucho más que un boxeador...");
// 8
createComment(4, 8, "Never watched water polo before somehow this ended up in my recommended");
createComment(3, 8, "Mamu vam jebem u picku Srbija vas kara redom a vi pustili kad gubi od Australije...");
createComment(5, 8, "As a water polo player, I would guarantee it is a hard sport, maybe hardest in world...");
// Updating the content of a comment
updateComment(5, "Updating the comment 5");
updateComment(2, "Updating the comment 2");
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
