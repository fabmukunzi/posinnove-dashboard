'use client';

import { useLoginMutation } from '@store/actions/auth';
import { setToken } from '@store/reducers/app';
import decodeToken from '@utils/auth/decodeUser';
import { setCookie } from 'nookies';
import { logo } from '@utils/images';
import { Button, Checkbox, Form, Input, Typography, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '@utils/routes';

interface LoginValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginComponent: React.FC = () => {
  const { Title } = Typography;
  const [login, { isLoading }] = useLoginMutation();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const handleLogin = async (values: LoginValues) => {
    try {
      const { data } = await login(values).unwrap();
      const decoded = decodeToken(data.token);

      setCookie(null, 'access_token', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: true,
      });

      dispatch(setToken(data.token));

      if (decoded) {
        params.get('redirectTo')
          ? push(params.get('redirectTo')!)
          : push(routes.home.url);
      } else {
        push(routes.home.url);
      }
    } catch (error: any) {
      notification.error({
        message: error?.data?.message,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center -mt-20 md:mt-0">
        <Image src={logo} alt="logo" className="md:hidden" />
        <Title level={2} className="text-primary font-semibold">
          Login
        </Title>
        <Form
          onFinish={handleLogin}
          requiredMark={false}
          layout="vertical"
          className="md:w-1/2 w-[80%]"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item name="remember" className="flex items-start my-0">
              <Checkbox>Remember Me</Checkbox>
            </Form.Item>
            <Link href="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>
          </div>
          <Button
            loading={isLoading}
            className="my-3"
            htmlType="submit"
            type="primary"
            block
          >
            Login
          </Button>
          <Title
            level={5}
            className="font-normal flex items-center justify-center gap-1"
          >
            I don’t have an account?{' '}
            <Link href="/signup" className="text-primary font-medium">
              Signup
            </Link>
          </Title>
        </Form>
      </div>
    </>
  );
};

export default LoginComponent;
