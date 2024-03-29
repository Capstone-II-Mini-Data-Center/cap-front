/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import OrderHistory from '@components/pages/Account/order_history';
import { seoDefualt } from '@constants';
import { tran } from '@utilities/i18n';

export default function Index({ locale, apiData }) {
  const { locale: trans } = tran(locale);

  return <OrderHistory locale={locale} trans={trans} apiData={apiData} />;
}

export async function getServerSideProps(ctx) {
  try {
    const accessToken = ctx.req.cookies.token;
    const user_id = ctx.req.cookies.user_id;
    const apiEndpoint = `${process.env.NEXT_PUBLIC_GET_USER_ORDER_HISTORY_API}?user_id=${user_id}`;
    const response = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const apiData = await response.json();
    return {
      props: {
        locale: ctx.locale,
        seo: {
          ...seoDefualt,
          linkTo: '/account/order_history',
        },
        apiData,
      },
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return {
      props: {
        locale: ctx.locale,
        seo: {
          ...seoDefualt,
          linkTo: '/account/order_history',
        },
        apiData: null,
      },
    };
  }
}
