export async function GetData() {
    const response = await fetch("/api", {
        method: "GET",
    });
    const body = await response.json();
    return body;
}