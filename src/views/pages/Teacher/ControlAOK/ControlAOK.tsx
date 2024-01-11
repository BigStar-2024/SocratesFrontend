import { FC, useEffect, useState, useContext }    from 'react';
import { useSelector }          from 'react-redux';
import { dictionary }           from './dictionary';
import { TeacherPgContainer }   from 'views/molecules/TeacherPgContainer/TeacherPgContainer';

const ControlAOK: FC = () => {
    let language:string     = useSelector((state: any) => state.user.language);
    language                = language? language : 'en-us'
    return (
        <TeacherPgContainer onlyLogoImgNav={true} title={dictionary[language]?.assignment}>
            <>
            </>
        </TeacherPgContainer>
    )
}

export default ControlAOK;
