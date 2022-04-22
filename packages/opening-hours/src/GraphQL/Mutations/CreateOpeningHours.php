<?php

namespace Yago\OpeningHours\GraphQL\Mutations;

use App\Services\FileManagerService;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Yago\OpeningHours\Models\OpeningHour;

class CreateOpeningHours
{
    public function __invoke(
        $rootValue,
        array $args,
        GraphQLContext $context,
        ResolveInfo $resolveInfo
    ) {
        OpeningHour::upsert($args['input'], ['id']);

        return true;
    }
}
