import { FC, useEffect }  from 'react';
import { useSelector }    from 'react-redux'
import { dictionary }     from './dictionary'
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux'
import {
  Container,
  Line,
  StepContent,
  Point
} from './Style'

type ParentPgStepperProps = {
  step: number;
}

export const ParentPgStepper: FC<ParentPgStepperProps> = ({step}) => {
  // const history = useHistory();
  // const dispatch = useDispatch()
  // const [age, setAge] = useState('');
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'en-us'

  useEffect(() => {
  }, []);

  return (
    <Container>
        <Point color={'#1771B9'} isCurrent={step === 1}> 1 </Point>
        <StepContent color={'#1771B9'}>{dictionary[language]?.setUpYourAccount}</StepContent>
        <Line />
        <Point color={'#21B95C'} isCurrent={step === 2}> 2 </Point>
        <StepContent>{dictionary[language]?.chooseYourPlan}</StepContent>
        <Line />
        <Point color={'#22BAAF'} isCurrent={step === 3}> 3 </Point>
        <StepContent color={'#22BAAF'}>{dictionary[language]?.ready}</StepContent>
    </Container>
  );
};
