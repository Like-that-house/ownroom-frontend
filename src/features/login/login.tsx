import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { CSSProperties } from 'styled-components';
import { Button } from '../../common/button';
import { Container } from '../../common/container';
import { Form } from '../../common/Form';
import { Img } from '../../common/img';
import { Input } from '../../common/input';
import { StyledLink } from '../../common/link';
import { Text } from '../../common/text';
import { symbol_with_text } from '../../static/images/svg';
import { useAppDispatch } from '../../store/configureStore.hooks';
import {
  fetchMyInfoAsync,
  getUserInfo,
  logInAsync,
  LoginInfo,
  User,
} from '../../store/modules/user';

export const LogIn = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    id: '',
    password: '',
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  useEffect(() => {
    if (loginInfo.id.length > 0 && loginInfo.password.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [handleChangeUser]);

  const handleSubmit = (
    loginInfo: LoginInfo,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(logInAsync(loginInfo)).then((data) => {
      if (data.type == 'user/LOG_IN/fulfilled') {
        dispatch(fetchMyInfoAsync());
        navigate('/');
      }
    });
  };

  return (
    <>
      <Container height="1000px" style={BackgroundCSS}>
        <Container width="470px" position="relative">
          <Text className="ENHeadline-1 gray001" style={LogInTitleCSS}>
            Login
          </Text>
          <Container style={LogInDecoratorCSS} />
          <Text className="KRBody-1 gray001" style={LogInText1CSS}>
            온룸에서 컨설턴트와 함께
            <br />
            나만의 집을 스타일링 해보세요.
          </Text>
          <Form
            style={LogInFormCSS}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
              handleSubmit(loginInfo, event)
            }
          >
            <Text className="KRHeadline-1 orange001" style={LogInText2CSS}>
              아이디
            </Text>
            <Input
              width={'280px'}
              height={'50px'}
              placeholder="아이디"
              style={LogInInputIdCSS}
              name="id"
              onChange={handleChangeUser}
              value={loginInfo.id}
            ></Input>
            <Text className="KRHeadline-1 orange001" style={LogInText3CSS}>
              비밀번호
            </Text>
            <Input
              type="password"
              width={'280px'}
              height={'50px'}
              style={LogInInputPasswordCSS}
              placeholder="비밀번호"
              name="password"
              onChange={handleChangeUser}
              value={loginInfo.password}
            ></Input>
            <Button
              width="400px"
              height="50px"
              style={LogInButtonCSS}
              isActive={isActive}
              disabled={!isActive}
            >
              <Text className="KRHeadline-1 graywhite">로그인</Text>
            </Button>
          </Form>

          <Container width="290px" height="32px" style={LogInTextContainerCSS}>
            <Text className="KRBody-1 gray002" style={LogInText4CSS}>
              온룸을 처음 이용하시나요?
            </Text>
            <StyledLink to="/signup">
              <Text className="KRBody-1 gray001">회원가입</Text>
            </StyledLink>
          </Container>
          <Img
            src={symbol_with_text}
            width="170px"
            height="77px"
            style={LoginBottomLogoCSS}
          ></Img>
        </Container>
      </Container>
    </>
  );
};
const BackgroundCSS: CSSProperties = {
  backgroundColor: 'var(--gray-gray-007)',
};

const LogInTitleCSS: CSSProperties = {
  position: 'absolute',
  top: '110px',
};
const LogInDecoratorCSS: CSSProperties = {
  position: 'absolute',
  top: '182px',

  width: '62px',
  height: '4px',
  backgroundColor: 'var(--brand-orange-001)',
};
const LogInText1CSS: CSSProperties = {
  textAlign: 'center',
  position: 'absolute',
  top: '216px',
};
const LogInText2CSS: CSSProperties = {
  position: 'absolute',
  top: '9px',
  left: 0,
};
const LogInText3CSS: CSSProperties = {
  position: 'absolute',
  top: '87px',
  left: 0,
};
const LogInText4CSS: CSSProperties = {
  marginRight: '7px',
};
const LogInTextContainerCSS: CSSProperties = {
  position: 'absolute',
  top: '606px',
};

const LogInFormCSS: CSSProperties = {
  position: 'absolute',
  top: '340px',
  width: '400px',
  height: '154px',
};

const LogInInputIdCSS: CSSProperties = {
  position: 'absolute',
  left: '100px',
  borderRadius: '8px',
};

const LogInInputPasswordCSS: CSSProperties = {
  position: 'absolute',
  top: '78px',
  left: '100px',
  borderRadius: '8px',
};

const LogInButtonCSS: CSSProperties = {
  position: 'absolute',
  top: '156px',
};

const LoginBottomLogoCSS: CSSProperties = {
  position: 'absolute',
  top: '758px',
};
