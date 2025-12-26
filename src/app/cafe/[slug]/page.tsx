import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import { getSoftwareById } from '@/lib/actions/software';
import AppDetailClient from './AppDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getSoftwareById(slug);

  if (!app) {
    redirect('/cafe');
  }

  return <AppDetailClient app={app} />;
}

