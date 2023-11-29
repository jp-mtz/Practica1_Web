const posts = new Map();
let nextId = 0;
addPost({ 
    artist: "Lorde", year: "2017", album: "Melodrama", cover: "https://i.scdn.co/image/ab67616d0000b27334b24bc065105d1fa5df4fa6",
    genre: "Electropop", score: "9", 
    review: "Lorde captures emotions like none other. Her second album is a masterful study of being a young woman, a sleek and humid pop record full of grief and hedonism, crafted with the utmost care and wisdom.",
    comment: {content: ["nice"], score1: ["9"], user:["User2023"]}});

addPost({
    artist: "Dua Lipa", year: "2020", album: "Future Nostalgia", cover: "https://i.scdn.co/image/ab67616d0000b2731f7c48d7efee22e04ce91917",
    genre: "Dance pop", score: "8",
    review: "Future Nostalgia is a breathtakingly fun, cohesive and ambitious attempt to find a place for disco in 2020."})

    
addPost({
    artist: "Peso Pluma", year: "2023", album: "Genesis", cover: "https://i.scdn.co/image/ab67616d0000b2732fb583ed96f8f35cbf2897ba",
    genre: "Corridos tumbados", score: "7",
    review: "Peso Pluma roots the record in turbulent brass, vivid lyricism and a Sinaloan tambora, cultivating all of the emotional intensity characteristic of old-school corridos"})

addPost({
    artist: "Kendrick Lamar", year: "2012", album: "Good Kid, MAAD City", cover: "https://i.scdn.co/image/ab67616d0000b273d58e537cea05c2156792c53d",
    genre: "Corridos tumbados", score: "10",
    review: "Is fearless and brilliant, an unvarnished and nuanced peek into the rapper's inner life that ties straightforward rap thrills directly to its narrative."})

addPost({
    artist: "Taylor Swift", year: "2020", album: "Folklore", cover: "https://i.scdn.co/image/ab67616d0000b27395f754318336a07e85ec59bc",
    genre: "Indie folk", score: "10",
    review: "Folklore is a big left turn in style and subject matter; it also has already earned Swift some of the best reviews of her career."})

addPost({
    artist: "Lauryn Hill", year: "1998", album: "The Miseducation of Lauryn Hill", cover: "https://i.scdn.co/image/ab67616d0000b273e08b1250db5f75643f1508c9",
    genre: "Hip hop", score: "8",
    review: "It is a love letter to the liberated self, the maternal self and to God. It is an album of junctures: between adolescence and adulthood"})

addPost({
    artist: "Mac Miller", year: "2018", album: "Swimming", cover: "https://i.scdn.co/image/ab67616d0000b273175c577a61aa13d4fb4b6534",
    genre: "Hip hop", score: "9",
    review: "On his wounded fifth album, Mac Miller sings deftly about heartbreak and his mental state, capturing his resignation without turning sadness into a performative spectacle."})

addPost({
    artist: "Lana Del Rey", year: "2019", album: "Norman Fucking Rockwell!", cover: "https://i.scdn.co/image/ab67616d0000b273879e9318cb9f4e05ee552ac9",
    genre: "Pop", score: "10",
    review: "On her elegant and complex fifth album, Lana Del Rey sings exquisitely of freedom and transformation and the wreckage of being alive. It establishes her as one of America’s greatest living songwriters."})

addPost({
    artist: "Halsey", year: "2015", album: "Badlands", cover: "https://i.scdn.co/image/ab67616d0000b273bd02d63417be256b22bffc28",
    genre: "Indie pop", score: "6",
    review: "It explores every nook and cranny it possibly could, while still holding together one progressive album that is relatable and fun all the same"})

addPost({
    artist: "Frank Ocean", year: "2016", album: "Blond", cover: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    genre: "R&B", score: "10",
    review: "Blond is an incredibly mature, intimate, personal, complex and ultimately riveting piece of work imo."})

addPost({
    artist: "Abba", year: "1979", album: "Voulez-Vous", cover: "https://i.scdn.co/image/ab67616d0000b273aa22899360d8ba6704732dec",
    genre: "Disco", score: "8",
    review: "Voulez-Vous is one of the greatest albums ABBA released. It's about the rollercoaster of romance. How it is messy and it can be good and bad at the same time."})

addPost({
    artist: "Ye", year: "2007", album: "Graduation", cover: "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a",
    genre: "Hip hop", score: "8",
    review: "Kanye West's third album is both his most consistent and most enterprising yet, indicating that he might actually deserve the legendary status he constantly ascribes to himself."})
 
    export function addPost(post) {
        let id = nextId++;
        post.id = id.toString();
        posts.set(post.id, post);
    }
    export function editPost(post, id) {
        post.id = id.toString();
        posts.set(post.id, post);
    }
    
    export function deletePost(id){
        posts.delete(id);
    }
    
    export function getPosts(){
        return [...posts.values()];
    }
    
    export function getPost(id){
        return posts.get(id);
    }

    export function updatePost(postId, postData) {
        let post = posts.get(postId);
        if (!post) {
          return false;
        }
        if (postData.artist !== undefined) {
          post.artist = postData.artist;
        }
        if (postData.year !== undefined) {
          post.year = postData.year;
        }
        if (postData.album !== undefined) {
          post.album = postData.album;
        }
        if (postData.cover !== undefined) {
            post.cover = postData.cover;
        }
        if (postData.genre !== undefined) {
            post.genre = postData.genre;
        }
        if (postData.score !== undefined) {
            post.score = postData.score;
        }
        if (postData.review !== undefined) {
            post.review = postData.review;
        }
        if (postData.comment !== undefined) {
          post.comment = post.comment || {} || [];
          if (postData.comment.content != undefined){
            post.comment.content = post.comment.content || [];
            post.comment.content.push(postData.comment.content); 
          }
          if (postData.comment.user != undefined){
            post.comment.user = post.comment.user || [];
            post.comment.user.push(postData.comment.user); 
          }
          if (postData.comment.score1 != undefined){
            post.comment.score1 = post.comment.score1 || [];
            post.comment.score1.push(postData.comment.score1); 
          } 
        }
        posts.set(postId, post);
        return true;
    }