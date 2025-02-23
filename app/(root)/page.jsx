import ChallengeCard from "../components/ChallengeCard";

export default async function Home(){
  const url = process.env.NEXT_PUBLIC_API_URL

  const challenges = await fetch(`${url}/challenges/`)
  const data = await challenges.json()
  console.log(data)
  return (
    <div className="w-[90%] mx-auto mt-7">
      <h1 className="text-2xl font-semibold">Challenges</h1>
      {data.map((challenge)=> (
        <ChallengeCard challenge={challenge} key={challenge.id}/>
      ))}
    </div>
  );
}
