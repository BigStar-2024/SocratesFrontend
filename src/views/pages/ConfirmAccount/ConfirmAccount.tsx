import {
  ConfirmationContainer, Logo,
  Card, Centered, StudentRegister,
  StudentSelector, StudentsForm,
  ValidationButton, Disclaimer
}                    from './Style';
import { FC, useContext, useEffect } from 'react';
import { LoadingContext }            from 'react-router-loading';
import { GeneralText }               from 'views/atoms/Text/GeneralText';
import { Header }                    from 'views/atoms/Text/Header';
import { Subheader } from 'views/atoms/Text/Subheader';
import { TextInput } from 'views/atoms/Text/TextInput';
import { Button }    from 'views/molecules/Button';
import { Body }      from 'views/atoms/Text/Body';
import logo          from 'views/assets/socrates-logo.svg';

export const ConfirmAccount: FC = () => {
  const loadingContext = useContext(LoadingContext);
  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <ConfirmationContainer>
      <Logo src={logo} />
      <Card>
        <Centered>
          <Header>Create Account</Header>
          <Subheader>Your info</Subheader>
        </Centered>
        <div>
          <GeneralText>Your name</GeneralText>
          <TextInput label={'Your name'} />
        </div>
        <div>
          <GeneralText>Password</GeneralText>
          <TextInput label={'Password'} />
        </div>
        <div>
          <GeneralText>Confirm password</GeneralText>
          <TextInput label={'Password'} />
        </div>
        <StudentRegister>
          <StudentSelector>
            <Button value={'test'} onClick={() => {}}/>
            <Button value={'test'} onClick={() => {}}/>
            <Button value={'test'} onClick={() => {}}/>
          </StudentSelector>
          <Centered>
            <StudentsForm>
              <GeneralText>Name</GeneralText>
              <TextInput label={'test'} />
              <GeneralText>Grade</GeneralText>
              <TextInput
                label={'test'}
                validate={val => val !== 'test'}
                errMsg={'whoopsie!'}
              />
            </StudentsForm>
            <ValidationButton>
              <Button value={'Validate'} onClick={() => {}} />
            </ValidationButton>
          </Centered>
        </StudentRegister>
        <Disclaimer>
          <Body style={{ fontSize: '14px' }}>
            By clicking Create Account, you agree to Learn With Socrates’s User
            Agreement, Privacy Policy, and Cookie Policy
          </Body>
        </Disclaimer>
      </Card>
    </ConfirmationContainer>
  );
};

