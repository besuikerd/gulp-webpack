module Components.HelloWorld exposing (helloWorld)

import Html exposing (..)
import Html.Attributes exposing (..)

helloWorld =
  div
    [ class "mt-h2" ]
    [ text "Hello World!" ]
