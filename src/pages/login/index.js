import { Login } from '@components/pages';
import { seoDefualt } from '@constants';
import { tran } from '@utilities/i18n';

export default function Index({ locale, apiData }) {
  const { locale: trans } = tran(locale);
  return <Login locale={locale} trans={trans} apiData={apiData} />;
}

export async function getServerSideProps(ctx) {
  try {
    const apiEndpoint = process.env.NEXT_PUBLIC_LOGIN_URL; // API endpoint for login
    const response = await fetch(apiEndpoint);
    const apiData = await response.json();

    return {
      props: {
        locale: ctx.locale,
        seo: {
          ...seoDefualt,
          linkTo: '/login',
        },
        apiData,
      },
    };
  } catch (error) {
    console.error('Error fetching data from login API:', error);
    return {
      props: {
        locale: ctx.locale,
        seo: {
          ...seoDefualt,
          linkTo: '/login',
        },
        apiData: null,
      },
    };
  }
}
