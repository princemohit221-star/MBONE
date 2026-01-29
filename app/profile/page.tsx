import ProfileContent from '@/components/profile/ProfileContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata = {
  title: 'Profile - MILLIONBONE',
  description: 'Manage your MILLIONBONE profile and account settings.',
};

export default function Profile() {
  return (
    <PageTransition>
      <Navbar />
      <ProfileContent />
      <Footer />
    </PageTransition>
  );
}