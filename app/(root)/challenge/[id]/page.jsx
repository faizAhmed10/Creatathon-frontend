import CodeEditor from "../../../components/CodeEditor"


export default async function ChallengePage({ params }) {

  const url = process.env.NEXT_PUBLIC_API_URL;
  const { id } = await params;
  // Fetch challenge data on the server
  const response = await fetch(`${url}/challenges/${id}`, { cache: "no-store" });

  const challenge = await response.json();

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-xl font-bold">{challenge.title}</h1>
      <p>{challenge.description}</p>
      <p className="text-gray-500">Difficulty: {challenge.difficulty}</p>
      <p className="text-gray-500">Points: {challenge.points}</p>

      {/* Pass challengeId to CodeEditor */}
      <CodeEditor challengeId={id} />
    </div>
  );
}
