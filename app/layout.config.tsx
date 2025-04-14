import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/images/Open_Food_Facts_logo.svg"
          alt="Open Food Facts"
          width={150}
          height={40}
          className="min-w-[150px] block dark:hidden"
        />
        <Image
          src="/images/open_food_facts_logo_dark.svg"
          alt="Open Food Facts"
          width={150}
          height={40}
          className="min-w-[150px] hidden dark:block"
        />
      </>
    ),
  },
};
