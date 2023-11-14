const posts = new Map();
let nextId = 0;
addPost({ 
    artist: "Lorde", year: "2017", album: "Melodrama", cover: "https://i.scdn.co/image/ab67616d0000b27334b24bc065105d1fa5df4fa6",
    genre: "Electropop", score: "9", 
    review: "Lorde captures emotions like none other. Her second album is a masterful study of being a young woman, a sleek and humid pop record full of grief and hedonism, crafted with the utmost care and wisdom."});

addPost({
    artist: "Dua Lipa", year: "2020", album: "Future Nostalgia", cover: "https://i.scdn.co/image/ab67616d0000b2731f7c48d7efee22e04ce91917",
    genre: "Dance pop", score: "9.7",
    review: "Future Nostalgia is a breathtakingly fun, cohesive and ambitious attempt to find a place for disco in 2020."})

    export function addPost(post) {
        let id = nextId++;
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