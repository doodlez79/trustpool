import { Linking } from 'react-native';

class LinkingService {
  async callPhone(phone: string) {
    return Linking.openURL(`tel:${phone}`);
  }

  async sendEmail(email: string) {
    return Linking.openURL(`mailto:${email}`);
  }

  async openURL(url: string) {
    return Linking.openURL(url);
  }
}

export default LinkingService;
