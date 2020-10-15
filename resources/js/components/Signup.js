import { PropsContext } from './Pages';
import { DataContext, SetStateContext } from './App';
import Subtitle from './Subtitle';
import React, { useContext, useEffect, useState } from 'react';
import Errors from './Errors';
import { PropTypes } from 'prop-types';

const axios = window.axios;

function Label(props) {
  const label = props.label;
  const name = props.name;
  const value = props.value;
  const onChange = props.onChange;

  const isPassword = name === 'password' || name === 'confirm-password';
  const attr = isPassword
    ? { type: 'password', autoComplete: 'new-password' }
    : { autoComplete: 'on' };

  return (
    <label htmlFor={name} className="d-block">
      {label}
      <input
        {...attr}
        name={name}
        id={name}
        className="d-block"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default function Signup() {
  const [userName, setUserName] = useState([]);
  const [strId, setStrId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const props = useContext(PropsContext);
  const isLogin = useContext(DataContext).isLogin;
  const setState = useContext(SetStateContext);

  useEffect(() => {
    isLogin && props.history.push('/home');
  }, []);

  function onClickSignup() {
    const validated = validation();

    if (validated) {
      axios
        .get('/sanctum/csrf-cookie')
        .then(() => {
          axios
            .post('/api/signup', {
              name: userName,
              str_id: strId,
              email: email,
              password: password,
              password_confirmation: confirmPassword,
            })
            .then((response) => {
              const params = response.data;
              console.log('----params---');
              console.log(params);
              setState.params(params);
              setState.isLogin(true);
              props.history.push('/home');
              // props.history.push({
              //   pathname: '/home',
              //   state: params,
              // });
            })
            .catch((error) => {
              console.log('--error----');
              console.log(error);
              // validation errorの場合
              if (error.response.status === 422) {
                const errors = Object.values(error.response.data.errors);
                setErrors(errors);
              }
            });
        })
        .catch(() => {
          alert('Error happened.');
        });
    }
  }

  function validation() {
    const newErrors = [];
    // TODO: Server sideと合わせる
    if (userName.length === 0) {
      newErrors.push('ユーザー名が入力されていません');
    }

    if (strId.length < 4) {
      newErrors.push('ユーザーIDが短すぎます');
    }

    if (email.length === 0) {
      newErrors.push('メールアドレスが入力されていません');
    }

    if (password !== confirmPassword) {
      newErrors.push('パスワードが一致していません');
    } else if (password.length < 8) {
      newErrors.push('パスワードが短すぎます');
    }

    if (newErrors.length) {
      setErrors(newErrors);
      return false;
    }

    return true;
  }

  return (
    <>
      <Subtitle subtitle="ユーザーの登録" />
      <div className="d-block row">
        <div className="col-12">
          <Errors errors={errors} />
          <form>
            <Label
              label="ユーザー名"
              name="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Label
              label="ユーザーID"
              name="user-id"
              value={strId}
              onChange={(e) => setStrId(e.target.value)}
            />
            <Label
              label="メールアドレス"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label
              label="パスワード"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label
              label="パスワード（再確認）"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </form>
          <button
            type="button"
            id="normal-login"
            className="btn btn-outline-success d-block"
            onClick={onClickSignup}
          >
            ユーザー登録
          </button>
        </div>
      </div>
    </>
  );
}

Label.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Errors.propTypes = {
  errors: PropTypes.array,
};
