export async function getHealth() {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error('Error fetching health:', error);
    throw error;
  }
}
