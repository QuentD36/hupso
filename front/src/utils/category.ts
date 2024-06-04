export const syncCategories = (category: string) => {
  switch (category) {
    case "science":
      return {
        color: "#079992",
        name: "Science fiction",
      };
    case "dystopia":
      return {
        color: "#0C2461",
        name: "Dystopie",
      };
    case "biography":
      return {
        color: "#E55039",
        name: "Biographie",
      };
    case "romance":
      return {
        color: "#FDA7DF",
        name: "Romance",
      };
    case "thriller":
      return {
        color: "#576574",
        name: "Thriller",
      };
    case "drama":
      return {
        color: "#C44569",
        name: "Drame",
      };
  }
};
