import React, { useContext, useState } from 'react';
import { SetStateContext } from './App';
import { MyButton, Caption, TextInput, NoImageCard } from './Components';
import { PropsContext } from './Pages';
import Subtitle from './Subtitle';
const axios = window.axios;

export default function Login() {
  const [strId, setStrId] = useState('');
  const [password, setPassword] = useState('');
  const props = useContext(PropsContext);
  const setState = useContext(SetStateContext);

  function afterLogin(user) {
    setState.params(user);
    setState.isLogin(true);
    window.scroll(0, 0);
    props.history.push('/home');
  }

  function guestLogin() {
    axios
      .get('/sanctum/csrf-cookie')
      .then(() => {
        axios
          .post('/api/guest/login')
          .then((response) => {
            const user = response.data;
            afterLogin(user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        alert('Error happened.');
      });
  }

  function normalUserLogin() {
    axios
      .get('/sanctum/csrf-cookie')
      .then(() => {
        axios
          .post('/api/login', {
            strId: strId,
            password: password,
          })
          .then((response) => {
            const user = response.data;
            afterLogin(user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        alert('Error happened.');
      });
  }

  return (
    <>
      <Subtitle subtitle="ログイン" />
      <NoImageCard bgColor="light-orange">
        <Caption isTop={true} content="ゲストユーザーでログイン" />
        <p>ゲストユーザーは、以下の機能を除く全ての機能がご利用になれます。</p>
        <ul>
          <li>ユーザー名、ユーザーIDの編集</li>
          <li>ユーザーの削除</li>
        </ul>
        <MyButton
          onClick={guestLogin}
          content="ゲストユーザーでログイン"
        />
      </NoImageCard>

      <NoImageCard margin="mt-5">
        <Caption isTop={true} content="ユーザー情報の入力（通常のユーザーでログイン）" />
        <TextInput
          name="user-id"
          content="ユーザーID"
          onChange={(e) => setStrId(e.target.value)}
        />
        <TextInput
          type="password"
          name="password"
          content="パスワード"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyButton
          id="normal-login"
          onClick={normalUserLogin}
          content="通常のユーザーでログイン"
        />
      </NoImageCard>
    </>
  );
}
