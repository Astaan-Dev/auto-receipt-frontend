import AuthLayout from '../components/AuthLayout';

export default function SendSMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 