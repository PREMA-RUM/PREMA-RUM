FROM --platform=linux/arm64 mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY . .
RUN dotnet restore
RUN dotnet publish ./PreEnrollmentMgmt.WebApi -c Release -o out

FROM --platform=linux/arm64 public.ecr.aws/lambda/dotnet:6-arm64
COPY --from=build-env /app/out/ ${LAMBDA_TASK_ROOT}
CMD ["PreEnrollmentMgmt.WebApi"]
