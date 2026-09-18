import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This fan wiki provides informational game guides for {siteConfig.name.replace(/ Wiki$/, "")}. We do not request account credentials, Roblox passwords, or private payment information.</p>
      <p>Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages.</p>
      <p>External links may lead to Roblox, Discord, YouTube, or community tools. Those services are governed by their own privacy policies.</p>
      <p>Questions about this policy can be sent to {siteConfig.supportEmail}.</p>
    </LegalPage>
  );
}
