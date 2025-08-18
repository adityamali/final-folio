"use client";
import AdminDashboard from '../../components/admin/AdminDashboard';
import { motion } from 'framer-motion';

export default function AdminPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AdminDashboard />
    </motion.div>
  );
}