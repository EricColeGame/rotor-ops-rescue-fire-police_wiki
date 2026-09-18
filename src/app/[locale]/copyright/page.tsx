import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function CopyrightPage() {
  return (
    <LegalPage title="Copyright">
      <p>Rotor Ops Rescue Fire Police, Roblox, Veltsim_Officiel, aircraft and emergency-service imagery, logos, and related media belong to their respective owners.</p>
      <p>This site is a non-official fan wiki built for educational and guide presentation purposes. It is not endorsed by or affiliated with the game developer or Roblox Corporation.</p>
      <p>If you own rights to content displayed here and have a concern, please contact {siteConfig.supportEmail} for review.</p>
    </LegalPage>
  );
}
