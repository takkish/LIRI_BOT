function Pokemon(apiRes) {
    this.name = apiRes.name;
    this.num = apiRes.id;
    this.weight = apiRes.weight;
    this.height = apiRes.height;
    this.types = apiRes.types;
    this.display = function () {
        console.log("~~~~~~~~~~~~~~~~~~~~");
        console.log(this.name.toUpperCase() + ":");
        console.log("Num: " + this.num);
        console.log("Weight: " + this.weight);
        console.log("Height: " + this.height);
        console.log("Types: " + this.types.join(", "));
        console.log("~~~~~~~~~~~~~~~~~~~~");
    }
}

module.exports = Pokemon;