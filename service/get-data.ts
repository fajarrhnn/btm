export async function GetData() {
    const response = await fetch("http://localhost:3000/api", {
        method: "GET",
    });
    const body = await response.json();
    return body;
}