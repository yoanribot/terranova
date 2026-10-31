/**
 * A deployment declaration is a release gate, not a consent decision or CMP.
 * The configured CMP remains responsible for each visitor's consent behavior.
 * @param {{ enabled: string | undefined, cmpReady: string | undefined, client: string | undefined, pathname: string, eligiblePaths: string[] }} options
 */
export function canLoadAds({ enabled, cmpReady, client, pathname, eligiblePaths }) {
  return enabled === 'true' && cmpReady === 'true' && /^ca-pub-\d{16}$/.test(client || '') && eligiblePaths.includes(pathname);
}
