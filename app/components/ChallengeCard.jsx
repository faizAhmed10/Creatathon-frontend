import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';

const ChallengeCard = ({challenge}) => {
    const {title, description, test_cases, difficulty, points, id} = challenge
    return (<Link href={`/challenge/${id}`}>
        <Card className='my-5'>
            <CardContent>
                <ul className='flex justify-between gap-10'>
                <li className='flex-1'>{title}</li>
                <li>{description}</li>
                <li>{difficulty}</li>
                <li>{points}</li>
                
                </ul>

            </CardContent>
        </Card>
        </Link>
        )

}

export default ChallengeCard;