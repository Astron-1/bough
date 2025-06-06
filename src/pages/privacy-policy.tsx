import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Text, { Font } from '@app/components/Text';

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Privacy Policy - Bough Consulting</title>
        <meta name="description" content="Privacy Policy for Bough Consulting LLC" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <article className="prose prose-slate max-w-none">
          <Text type={Font.GARAMOND} className="text-4xl font-bold mb-4 text-black">Privacy Policy</Text>
          <Text className="text-base text-gray-600 mb-8">Last updated: June 04, 2025</Text>

          <div className="space-y-6">
            <section>
              <Text className="text-gray-700">
                This Privacy Policy describes Our policies and procedures on the collection, use and
                disclosure of Your information when You use the Service and tells You about Your
                privacy rights and how the law protects You.
              </Text>
              <Text className="text-gray-700">
                We use Your Personal data to provide and improve the Service. By using the Service,
                You agree to the collection and use of information in accordance with this Privacy
                Policy.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Interpretation and Definitions
              </Text>
              <Text type={Font.GARAMOND} className="text-2xl font-semibold mt-6 mb-3 text-black">Interpretation</Text>
              <Text className="text-gray-700">
                The words of which the initial letter is capitalized have meanings defined under the
                following conditions. The following definitions shall have the same meaning
                regardless of whether they appear in singular or in plural.
              </Text>

              <Text type={Font.GARAMOND} className="text-2xl font-semibold mt-6 mb-3 text-black">Definitions</Text>
              <Text className="text-gray-700">For the purposes of this Privacy Policy:</Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">
                    <strong>Account</strong> means a unique account created for You to access our
                    Service or parts of our Service.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>Company</strong> (referred to as either "the Company", "We", "Us" or
                    "Our" in this Agreement) refers to Bough Consulting LLC, 231 Portside Dr,
                    Edgewater, NJ 07020, United States.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>Cookies</strong> are small files that are placed on Your computer, mobile
                    device or any other device by a website, containing the details of Your browsing
                    history on that website among its many uses.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>Country</strong> refers to: New Jersey, United States
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>Personal Data</strong> is any information that relates to an identified
                    or identifiable individual.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>Service</strong> refers to the Website.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>Website</strong> refers to Bough Consulting, accessible from{' '}
                    <Link href="https://www.boughconsulting.com" className="text-blue-600 hover:text-blue-800">
                      www.boughconsulting.com
                    </Link>
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>You</strong> means the individual accessing or using the Service, or the
                    company, or other legal entity on behalf of which such individual is accessing or
                    using the Service, as applicable.
                  </Text>
                </li>
              </ul>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Collecting and Using Your Personal Data
              </Text>
              <Text type={Font.GARAMOND} className="text-2xl font-semibold mt-6 mb-3 text-black">
                Types of Data Collected
              </Text>

              <Text type={Font.GARAMOND} className="text-xl font-semibold mt-4 mb-2 text-black">Personal Data</Text>
              <Text className="text-gray-700">
                While using Our Service, We may ask You to provide Us with certain personally
                identifiable information that can be used to contact or identify You. Personally
                identifiable information may include, but is not limited to:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">Email address</Text>
                </li>
                <li>
                  <Text className="text-gray-700">First name and last name</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Phone number</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Address, State, Province, ZIP/Postal code, City</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Usage Data</Text>
                </li>
              </ul>

              <Text type={Font.GARAMOND} className="text-xl font-semibold mt-6 mb-2 text-black">Usage Data</Text>
              <Text className="text-gray-700">Usage Data is collected automatically when using the Service.</Text>
              <Text className="text-gray-700">
                Usage Data may include information such as Your Device's Internet Protocol address
                (e.g. IP address), browser type, browser version, the pages of our Service that You
                visit, the time and date of Your visit, the time spent on those pages, unique
                device identifiers and other diagnostic data.
              </Text>
              <Text className="text-gray-700">
                When You access the Service by or through a mobile device, We may collect certain
                information automatically, including, but not limited to, the type of mobile device
                You use, Your mobile device unique ID, the IP address of Your mobile device, Your
                mobile operating system, the type of mobile Internet browser You use, unique device
                identifiers and other diagnostic data.
              </Text>

              <Text type={Font.GARAMOND} className="text-xl font-semibold mt-6 mb-2 text-black">
                Information from Third-Party Social Media Services
              </Text>
              <Text className="text-gray-700">
                The Company allows You to create an account and log in to use the Service through
                the following Third-party Social Media Services:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">Google</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Facebook</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Instagram</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Twitter</Text>
                </li>
                <li>
                  <Text className="text-gray-700">LinkedIn</Text>
                </li>
              </ul>
              <Text className="mt-4 text-gray-700">
                If You decide to register through or otherwise grant us access to a Third-Party
                Social Media Service, We may collect Personal data that is already associated with
                Your Third-Party Social Media Service's account, such as Your name, Your email
                address, Your activities or Your contact list associated with that account.
              </Text>
              <Text className="mt-2 text-gray-700">
                You may also have the option of sharing additional information with the Company
                through Your Third-Party Social Media Service's account. If You choose to provide
                such information and Personal Data, during registration or otherwise, You are giving
                the Company permission to use, share, and store it in a manner consistent with this
                Privacy Policy.
              </Text>

              <Text type={Font.GARAMOND} className="text-xl font-semibold mt-6 mb-2 text-black">
                Tracking Technologies and Cookies
              </Text>
              <Text className="text-gray-700">
                We use Cookies and similar tracking technologies to track the activity on Our
                Service and store certain information. Tracking technologies used are beacons, tags,
                and scripts to collect and track information and to improve and analyze Our
                Service.
              </Text>
              <Text className="text-gray-700">
                We use both Session and Persistent Cookies for the purposes set out below:
              </Text>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <Text className="font-semibold text-gray-700">Necessary / Essential Cookies</Text>
                  <Text className="text-gray-700">Type: Session Cookies</Text>
                  <Text className="text-gray-700">Administered by: Us</Text>
                  <Text className="text-gray-700">
                    Purpose: These Cookies are essential to provide You with services available
                    through the Website and to enable You to use some of its features. They help to
                    authenticate users and prevent fraudulent use of user accounts. Without these
                    Cookies, the services that You have asked for cannot be provided, and We only
                    use these Cookies to provide You with those services.
                  </Text>
                </li>
                <li>
                  <Text className="font-semibold text-gray-700">Functionality Cookies</Text>
                  <Text className="text-gray-700">Type: Persistent Cookies</Text>
                  <Text className="text-gray-700">Administered by: Us</Text>
                  <Text className="text-gray-700">
                    Purpose: These Cookies allow us to remember choices You make when You use the
                    Website, such as remembering your login details or language preference. The
                    purpose of these Cookies is to provide You with a more personal experience and
                    to avoid You having to re-enter your preferences every time You use the
                    Website.
                  </Text>
                </li>
              </ul>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Use of Your Personal Data
              </Text>
              <Text className="text-gray-700">The Company may use Personal Data for the following purposes:</Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">
                    <strong>To provide and maintain our Service</strong>, including to monitor the
                    usage of our Service.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>To manage Your Account:</strong> to manage Your registration as a user
                    of the Service.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>For the performance of a contract:</strong> the development, compliance
                    and undertaking of the purchase contract for the products, items or services
                    You have purchased or of any other contract with Us through the Service.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>To contact You:</strong> To contact You by email, telephone calls, SMS,
                    or other equivalent forms of electronic communication, such as a mobile
                    application's push notifications regarding updates or informative
                    communications related to the functionalities, products or contracted services,
                    including the security updates, when necessary or reasonable for their
                    implementation.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>To provide You</strong> with news, special offers and general
                    information about other goods, services and events which we offer that are
                    similar to those that you have already purchased or enquired about unless You
                    have opted not to receive such information.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>For business transfers:</strong> We may use Your information to
                    evaluate or conduct a merger, divestiture, restructuring, reorganization,
                    dissolution, or other sale or transfer of some or all of Our assets, whether as
                    a going concern or as part of bankruptcy, liquidation, or similar proceeding,
                    in which Personal Data held by Us about our Service users is among the assets
                    transferred.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>For other purposes:</strong> We may use Your information for other
                    purposes, such as data analysis, identifying usage trends, determining the
                    effectiveness of our promotional campaigns and to evaluate and improve our
                    Service, products, services, marketing and your experience.
                  </Text>
                </li>
              </ul>

              <Text className="mt-6 mb-4 text-gray-700">
                We may share Your personal information in the following situations:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">
                    <strong>With Service Providers:</strong> We may share Your personal
                    information with Service Providers to monitor and analyze the use of our
                    Service, to contact You.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>For business transfers:</strong> We may share or transfer Your personal
                    information in connection with, or during negotiations of, any merger, sale of
                    Company assets, financing, or acquisition of all or a portion of Our business
                    to another company.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>With Affiliates:</strong> We may share Your information with Our
                    affiliates, in which case we will require those affiliates to honor this
                    Privacy Policy. Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that We control or that
                    are under common control with Us.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>With business partners:</strong> We may share Your information with
                    Our business partners to offer You certain products, services or promotions.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>With other users:</strong> when You share personal information or
                    otherwise interact in the public areas with other users, such information may
                    be viewed by all users and may be publicly distributed outside. If You
                    interact with other users or register through a Third-Party Social Media
                    Service, Your contacts on the Third-Party Social Media Service may see Your
                    name, profile, pictures and description of Your activity. Similarly, other
                    users will be able to view descriptions of Your activity, communicate with You
                    and view Your profile.
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    <strong>With Your consent:</strong> We may disclose Your personal information
                    for any other purpose with Your consent.
                  </Text>
                </li>
              </ul>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Retention of Your Personal Data
              </Text>
              <Text className="text-gray-700">
                The Company will retain Your Personal Data only for as long as is necessary for the
                purposes set out in this Privacy Policy. We will retain and use Your Personal Data
                to the extent necessary to comply with our legal obligations, resolve disputes, and
                enforce our legal agreements and policies.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Delete Your Personal Data
              </Text>
              <Text className="text-gray-700">
                You have the right to delete or request that We assist in deleting the Personal
                Data that We have collected about You.
              </Text>
              <Text className="text-gray-700">
                Our Service may give You the ability to delete certain information about You from
                within the Service.
              </Text>
              <Text className="text-gray-700">
                You may update, amend, or delete Your information at any time by signing in to
                Your Account, if you have one, and visiting the account settings section that
                allows you to manage Your personal information. You may also contact Us to request
                access to, correct, or delete any personal information that You have provided to
                Us.
              </Text>
              <Text className="text-gray-700">
                Please note, however, that We may need to retain certain information when we have
                a legal obligation or lawful basis to do so.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Disclosure of Your Personal Data
              </Text>
              
              <Text type={Font.GARAMOND} className="text-2xl font-semibold mt-6 mb-3 text-black">
                Business Transactions
              </Text>
              <Text className="text-gray-700">
                If the Company is involved in a merger, acquisition or asset sale, Your Personal
                Data may be transferred. We will provide notice before Your Personal Data is
                transferred and becomes subject to a different Privacy Policy.
              </Text>

              <Text type={Font.GARAMOND} className="text-2xl font-semibold mt-6 mb-3 text-black">
                Law enforcement
              </Text>
              <Text className="text-gray-700">
                Under certain circumstances, the Company may be required to disclose Your Personal
                Data if required to do so by law or in response to valid requests by public
                authorities (e.g. a court or a government agency).
              </Text>

              <Text type={Font.GARAMOND} className="text-2xl font-semibold mt-6 mb-3 text-black">
                Other legal requirements
              </Text>
              <Text className="text-gray-700">
                The Company may disclose Your Personal Data in the good faith belief that such
                action is necessary to:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">Comply with a legal obligation</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Protect and defend the rights or property of the Company</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Prevent or investigate possible wrongdoing in connection with the Service</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Protect the personal safety of Users of the Service or the public</Text>
                </li>
                <li>
                  <Text className="text-gray-700">Protect against legal liability</Text>
                </li>
              </ul>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Transfer of Your Personal Data
              </Text>
              <Text className="text-gray-700">
                Your information, including Personal Data, is processed at the Company's operating
                offices and in any other places where the parties involved in the processing are
                located. Your consent to this Privacy Policy followed by Your submission of such
                information represents Your agreement to that transfer.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Security of Your Personal Data
              </Text>
              <Text className="text-gray-700">
                The security of Your Personal Data is important to Us, but remember that no method
                of transmission over the Internet, or method of electronic storage is 100% secure.
                While We strive to use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Children's Privacy
              </Text>
              <Text className="text-gray-700">
                Our Service does not address anyone under the age of 13. We do not knowingly
                collect personally identifiable information from anyone under the age of 13. If You
                are a parent or guardian and You are aware that Your child has provided Us with
                Personal Data, please contact Us.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Links to Other Websites
              </Text>
              <Text className="text-gray-700">
                Our Service may contain links to other websites that are not operated by Us. If You
                click on a third party link, You will be directed to that third party's site. We
                strongly advise You to review the Privacy Policy of every site You visit.
              </Text>
              <Text className="text-gray-700">
                We have no control over and assume no responsibility for the content, privacy
                policies or practices of any third party sites or services.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">
                Changes to this Privacy Policy
              </Text>
              <Text className="text-gray-700">
                We may update Our Privacy Policy from time to time. We will notify You of any
                changes by posting the new Privacy Policy on this page.
              </Text>
              <Text className="text-gray-700">
                We will let You know via email and/or a prominent notice on Our Service, prior to
                the change becoming effective and update the "Last updated" date at the top of this
                Privacy Policy.
              </Text>
            </section>

            <section>
              <Text type={Font.GARAMOND} className="text-3xl font-semibold mt-8 mb-4 text-black">Contact Us</Text>
              <Text className="text-gray-700">If you have any questions about this Privacy Policy, You can contact us:</Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Text className="text-gray-700">
                    By email:{' '}
                    <Link href="mailto:contact@boughconsulting.com" className="text-blue-600 hover:text-blue-800">
                      contact@boughconsulting.com
                    </Link>
                  </Text>
                </li>
                <li>
                  <Text className="text-gray-700">
                    By visiting this page on our website:{' '}
                    <Link href="https://boughconsulting.com/contact" className="text-blue-600 hover:text-blue-800">
                      https://boughconsulting.com/contact
                    </Link>
                  </Text>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 