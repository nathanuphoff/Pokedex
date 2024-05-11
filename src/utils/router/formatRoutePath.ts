/**
 * Create route path with the proper param values using a route path template.
 * @param path {string} the route path template, this must follow the NextJS app router name conventions.
 * @param params {object} (optional) the route path param.
 * @returns A pathname with the route params applied to it’s template.
 */
export function formatRoutePath<Path extends string>(
  // Abuse argument destructuring to allow typed variadic function.
  ...[path, params = {}]: CreateRoutePathArguments<Path>
): string {
  const pathSegments = path.split('/');
  const pathSegmentsWithParamValues: Array<RoutePathParamValue> = [];

  for (let index = 0; index < pathSegments.length; ++index) {
    const segment = pathSegments[index];

    // Match the path segment for path param tokens
    const paramSegmentMatch = segment.match(
      /^(\[{1,2})(\.{3})?([^\]]+)(\]{1,2})$/,
    );

    if (!paramSegmentMatch) {
      pathSegmentsWithParamValues.push(segment);
      continue;
    }

    const [, openingBrackets, restDots, paramName, closingBrackets] =
      paramSegmentMatch;

    if (openingBrackets.length !== closingBrackets.length) {
      throw new TypeError(
        `Path param opening and closing bracket(s) must be of the same amount`,
      );
    }

    const paramsValue = params[paramName as keyof typeof params];
    const isOptional = openingBrackets.length === 2;

    if (paramsValue == null) {
      if (!isOptional) {
        throw new TypeError(`Path param value for “${paramName}” is required`);
      }

      // After a nullish optional param is encountered we are done
      break;
    }

    const isRestParam = Boolean(restDots);
    const isArrayValue = Array.isArray(paramsValue);

    if (isRestParam !== isArrayValue) {
      throw new TypeError(
        isRestParam
          ? `Path param value must be an Array`
          : `Path param value must be a string or number`,
      );
    }

    if (isArrayValue) {
      pathSegmentsWithParamValues.push(
        ...(paramsValue as Array<RoutePathParamValue>),
      );
    } else {
      pathSegmentsWithParamValues.push(paramsValue as RoutePathParamValue);
    }
  }

  return pathSegmentsWithParamValues.join('/');
}

type RoutePathParamValue = string | number;

/**
 * Util to extract route path params from a route path template string.
 * @see https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
 */
type RoutePathParams<Path extends string> =
  // Remove leading forward slash
  Path extends `/${infer Body}`
    ? RoutePathParams<Body>
    : // Split path by separator and get params for each segment
      Path extends `${infer Segment}/${infer Rest}`
      ? RoutePathParams<Segment> & RoutePathParams<Rest>
      : RoutePathSegmentParams<Path>;

/**
 * Util to create a route path params object from a route path segment template string.
 * @see https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
 */
type RoutePathSegmentParams<Segment extends string> =
  // Check for optional param segment
  Segment extends `[[${infer Param}]]`
    ? // Check if segment is a rest param
      Param extends `...${infer ParamName}`
      ? {
          [Key in ParamName]?: Array<RoutePathParamValue> | null;
        }
      : {
          [Key in Param]?: RoutePathParamValue | null;
        }
    : // Check for required param segment
      Segment extends `[${infer Param}]`
      ? // Check if segment is a rest param
        Param extends `...${infer ParamName}`
        ? {
            [Key in ParamName]: Array<RoutePathParamValue>;
          }
        : {
            [Key in Param]: RoutePathParamValue;
          }
      : // Don’t allow any other keys
        Record<never, unknown>;

/**
 * Variadic arguments for createRoutePath function with an optional params parameter.
 */
export type CreateRoutePathArguments<Path extends string> =
  BaseCreateRoutePathArguments<Path, RoutePathParams<Path>>;

type BaseCreateRoutePathArguments<
  Path extends string,
  Params extends Record<string, unknown>,
> = keyof Params extends never
  ? // Make params argument optional when params object is empty
    [path: Path, params?: Record<never, unknown>]
  : [path: Path, params: Params];
